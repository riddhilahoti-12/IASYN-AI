from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.patient import PatientProfile
from app.models.doctor import DoctorProfile
from app.models.assignment import DoctorPatientAssignment
from app.models.session import RehabSession
from app.schemas.session import RehabSessionResponse, RehabSessionCreate
from app.services.audit_service import record_audit

router = APIRouter(prefix="/sessions", tags=["Rehabilitation Sessions"])


@router.get("/{session_id}", response_model=RehabSessionResponse)
def get_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Retrieves session details ensuring patient or assigned clinician access."""
    session = db.query(RehabSession).filter(RehabSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    if current_user.role.upper() == "PATIENT":
        patient = db.query(PatientProfile).filter(PatientProfile.user_id == current_user.id).first()
        if not patient or session.patient_id != patient.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to this session record")
    elif current_user.role.upper() == "DOCTOR":
        doctor = db.query(DoctorProfile).filter(DoctorProfile.user_id == current_user.id).first()
        if not doctor:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
        assignment = (
            db.query(DoctorPatientAssignment)
            .filter(
                DoctorPatientAssignment.doctor_id == doctor.id,
                DoctorPatientAssignment.patient_id == session.patient_id,
                DoctorPatientAssignment.status == "ACTIVE",
            )
            .first()
        )
        if not assignment:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: patient not assigned to your roster",
            )

    return session
