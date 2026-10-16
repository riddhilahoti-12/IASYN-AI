from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.config import settings
from app.api.deps import get_db, get_current_admin
from app.models.user import User
from app.models.patient import PatientProfile
from app.models.doctor import DoctorProfile
from app.models.therapy_plan import TherapyPlan
from app.models.session import RehabSession
from app.models.audit import AuditLog
from app.schemas.user import UserStatusUpdate
from app.schemas.doctor import DoctorVerificationUpdate
from app.schemas.admin import AuditLogResponse, SystemStatsResponse, AdminUserItem
from app.services.audit_service import record_audit

router = APIRouter(prefix="/admin", tags=["Admin Governance"])


@router.get("/users", response_model=List[AdminUserItem])
def list_users(
    role: Optional[str] = Query(None, description="Filter by role: PATIENT, DOCTOR, ADMIN"),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Returns users with administrative metadata.
    Does NOT expose private clinical records or telemetry.
    """
    query = db.query(User)
    if role:
        query = query.filter(User.role == role.upper())
    users = query.order_by(User.created_at.desc()).all()

    items = []
    for u in users:
        display_name = u.email.split("@")[0].capitalize()
        verification_status = None
        medical_id = None

        if u.role.upper() == "PATIENT":
            p = db.query(PatientProfile).filter(PatientProfile.user_id == u.id).first()
            if p:
                display_name = p.display_name
                medical_id = p.medical_id
        elif u.role.upper() == "DOCTOR":
            d = db.query(DoctorProfile).filter(DoctorProfile.user_id == u.id).first()
            if d:
                display_name = d.display_name
                verification_status = d.verification_status
        elif u.role.upper() == "ADMIN":
            display_name = "Clinical Administrator"

        items.append(
            AdminUserItem(
                id=u.id,
                email=u.email,
                role=u.role.upper(),
                display_name=display_name,
                is_active=u.is_active,
                created_at=u.created_at,
                verification_status=verification_status,
                medical_id=medical_id,
            )
        )
    return items


@router.put("/users/{user_id}/status", response_model=AdminUserItem)
def update_user_status(
    user_id: str,
    status_update: UserStatusUpdate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """Activates or deactivates a user account."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if user.id == admin.id and not status_update.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot deactivate own administrative account",
        )

    user.is_active = status_update.is_active
    db.commit()
    db.refresh(user)

    record_audit(
        db=db,
        action="UPDATE_USER_ACCOUNT_STATUS",
        resource_type="USER",
        actor_id=admin.id,
        resource_id=user.id,
        metadata_json={"new_status": user.is_active, "target_email": user.email},
    )

    display_name = user.email.split("@")[0].capitalize()
    return AdminUserItem(
        id=user.id,
        email=user.email,
        role=user.role.upper(),
        display_name=display_name,
        is_active=user.is_active,
        created_at=user.created_at,
    )


@router.put("/doctors/{doctor_id}/verification", response_model=AdminUserItem)
def update_doctor_verification(
    doctor_id: str,
    verification: DoctorVerificationUpdate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """Reviews and updates a doctor's clinical verification status."""
    doctor = db.query(DoctorProfile).filter(DoctorProfile.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor profile not found")

    new_status = verification.verification_status.upper()
    if new_status not in ["VERIFIED", "PENDING_REVIEW", "SUSPENDED"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be one of: VERIFIED, PENDING_REVIEW, SUSPENDED",
        )

    doctor.verification_status = new_status
    db.commit()
    db.refresh(doctor)

    record_audit(
        db=db,
        action="UPDATE_DOCTOR_VERIFICATION",
        resource_type="DOCTOR_PROFILE",
        actor_id=admin.id,
        resource_id=doctor.id,
        metadata_json={"new_verification_status": new_status, "license": doctor.license_number},
    )

    return AdminUserItem(
        id=doctor.user.id,
        email=doctor.user.email,
        role="DOCTOR",
        display_name=doctor.display_name,
        is_active=doctor.user.is_active,
        created_at=doctor.user.created_at,
        verification_status=doctor.verification_status,
    )


@router.get("/audit-logs", response_model=List[AuditLogResponse])
def get_audit_logs(
    limit: int = Query(50, ge=1, le=200),
    action: Optional[str] = Query(None),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Returns system and HIPAA audit logs for clinical governance.
    Restricted to authorized system administrators.
    """
    query = db.query(AuditLog)
    if action:
        query = query.filter(AuditLog.action == action)
    logs = query.order_by(AuditLog.timestamp.desc()).limit(limit).all()
    return logs


@router.get("/stats", response_model=SystemStatsResponse)
def get_system_stats(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """Returns platform metadata, model registry counters, and operational metrics."""
    return SystemStatsResponse(
        total_users=db.query(User).count(),
        total_patients=db.query(PatientProfile).count(),
        total_doctors=db.query(DoctorProfile).count(),
        total_active_plans=db.query(TherapyPlan).filter(TherapyPlan.approval_status == "APPROVED").count(),
        total_sessions_completed=db.query(RehabSession).count(),
        total_audit_events=db.query(AuditLog).count(),
        environment=settings.ENVIRONMENT,
        version=settings.VERSION,
    )
