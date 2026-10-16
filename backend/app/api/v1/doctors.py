from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_doctor
from app.models.doctor import DoctorProfile
from app.models.patient import PatientProfile
from app.models.assignment import DoctorPatientAssignment
from app.models.therapy_plan import TherapyPlan
from app.models.session import RehabSession
from app.schemas.patient import PatientDetailResponse
from app.schemas.therapy_plan import TherapyPlanResponse, TherapyPlanCreate
from app.schemas.session import RehabSessionResponse, RehabSessionFeedback
from app.services.audit_service import record_audit

router = APIRouter(prefix="/doctors", tags=["Doctor Portal"])


def verify_patient_assigned_to_doctor(doctor: DoctorProfile, patient_id: str, db: Session) -> PatientProfile:
    """Verifies that the target patient is currently assigned to this doctor."""
    assignment = (
        db.query(DoctorPatientAssignment)
        .filter(
            DoctorPatientAssignment.doctor_id == doctor.id,
            DoctorPatientAssignment.patient_id == patient_id,
            DoctorPatientAssignment.status == "ACTIVE",
        )
        .first()
    )
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: This patient is not assigned to your clinical care roster.",
        )

    patient = db.query(PatientProfile).filter(PatientProfile.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient profile not found")
    return patient


@router.get("/patients", response_model=List[PatientDetailResponse])
def get_assigned_patients(
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """Returns list of patients assigned to this doctor."""
    assignments = (
        db.query(DoctorPatientAssignment)
        .filter(
            DoctorPatientAssignment.doctor_id == doctor.id,
            DoctorPatientAssignment.status == "ACTIVE",
        )
        .all()
    )
    patient_ids = [a.patient_id for a in assignments]
    patients = db.query(PatientProfile).filter(PatientProfile.id.in_(patient_ids)).all()

    result = []
    for p in patients:
        active_plan = (
            db.query(TherapyPlan)
            .filter(TherapyPlan.patient_id == p.id, TherapyPlan.approval_status == "APPROVED")
            .first()
        )
        session_count = db.query(RehabSession).filter(RehabSession.patient_id == p.id).count()
        result.append(
            PatientDetailResponse(
                id=p.id,
                user_id=p.user_id,
                display_name=p.display_name,
                medical_id=p.medical_id,
                phone=p.phone,
                demographics=p.demographics,
                rehab_goals=p.rehab_goals,
                consent_status=p.consent_status,
                consent_timestamp=p.consent_timestamp,
                baseline_rom=p.baseline_rom,
                contraindications=p.contraindications,
                email=p.user.email if p.user else None,
                assigned_doctor_name=doctor.display_name,
                active_plan_title=active_plan.title if active_plan else None,
                recent_sessions_count=session_count,
            )
        )
    return result


@router.get("/patients/{patient_id}", response_model=PatientDetailResponse)
def get_patient_details(
    patient_id: str,
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """Views full authorized record of an assigned patient."""
    patient = verify_patient_assigned_to_doctor(doctor, patient_id, db)
    active_plan = (
        db.query(TherapyPlan)
        .filter(TherapyPlan.patient_id == patient.id, TherapyPlan.approval_status == "APPROVED")
        .first()
    )
    session_count = db.query(RehabSession).filter(RehabSession.patient_id == patient.id).count()

    record_audit(
        db=db,
        action="VIEW_ASSIGNED_PATIENT_RECORD",
        resource_type="PATIENT_PROFILE",
        actor_id=doctor.user_id,
        resource_id=patient.id,
    )

    return PatientDetailResponse(
        id=patient.id,
        user_id=patient.user_id,
        display_name=patient.display_name,
        medical_id=patient.medical_id,
        phone=patient.phone,
        demographics=patient.demographics,
        rehab_goals=patient.rehab_goals,
        consent_status=patient.consent_status,
        consent_timestamp=patient.consent_timestamp,
        baseline_rom=patient.baseline_rom,
        contraindications=patient.contraindications,
        email=patient.user.email if patient.user else None,
        assigned_doctor_name=doctor.display_name,
        active_plan_title=active_plan.title if active_plan else None,
        recent_sessions_count=session_count,
    )


@router.get("/patients/{patient_id}/sessions", response_model=List[RehabSessionResponse])
def get_patient_sessions(
    patient_id: str,
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """Views sessions of an assigned patient."""
    patient = verify_patient_assigned_to_doctor(doctor, patient_id, db)
    sessions = (
        db.query(RehabSession)
        .filter(RehabSession.patient_id == patient.id)
        .order_by(RehabSession.start_time.desc())
        .all()
    )
    return sessions


@router.put("/sessions/{session_id}/feedback", response_model=RehabSessionResponse)
def provide_session_feedback(
    session_id: str,
    feedback: RehabSessionFeedback,
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """Doctor provides clinical feedback and marks session reviewed."""
    session = db.query(RehabSession).filter(RehabSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    # Verify patient assignment
    verify_patient_assigned_to_doctor(doctor, session.patient_id, db)

    session.clinician_feedback = feedback.clinician_feedback
    session.clinician_reviewed = feedback.clinician_reviewed
    db.commit()
    db.refresh(session)

    record_audit(
        db=db,
        action="DOCTOR_REVIEW_SESSION",
        resource_type="REHAB_SESSION",
        actor_id=doctor.user_id,
        resource_id=session.id,
    )
    return session
