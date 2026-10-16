from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_patient
from app.models.patient import PatientProfile
from app.models.therapy_plan import TherapyPlan
from app.models.session import RehabSession
from app.schemas.patient import PatientProfileResponse, PatientProfileUpdate
from app.schemas.therapy_plan import TherapyPlanResponse
from app.schemas.session import RehabSessionResponse, RehabSessionCreate
from app.services.audit_service import record_audit

router = APIRouter(prefix="/patients", tags=["Patient Portal"])


@router.get("/me", response_model=PatientProfileResponse)
def get_own_profile(
    patient: PatientProfile = Depends(get_current_patient),
):
    """Returns the authenticated patient's clinical profile."""
    return patient


@router.put("/me", response_model=PatientProfileResponse)
def update_own_profile(
    update_data: PatientProfileUpdate,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """Updates the patient's demographics, contact, or goals."""
    if update_data.display_name is not None:
        patient.display_name = update_data.display_name
    if update_data.phone is not None:
        patient.phone = update_data.phone
    if update_data.demographics is not None:
        patient.demographics = update_data.demographics
    if update_data.rehab_goals is not None:
        patient.rehab_goals = update_data.rehab_goals
    if update_data.consent_status is not None:
        patient.consent_status = update_data.consent_status

    db.commit()
    db.refresh(patient)
    record_audit(
        db=db,
        action="UPDATE_OWN_PROFILE",
        resource_type="PATIENT_PROFILE",
        actor_id=patient.user_id,
        resource_id=patient.id,
    )
    return patient


@router.get("/me/plans", response_model=List[TherapyPlanResponse])
def get_own_therapy_plans(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """Returns all therapy plans prescribed to the authenticated patient."""
    plans = db.query(TherapyPlan).filter(TherapyPlan.patient_id == patient.id).all()
    return plans


@router.get("/me/sessions", response_model=List[RehabSessionResponse])
def get_own_sessions(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """Returns all rehabilitation sessions logged by the authenticated patient."""
    sessions = (
        db.query(RehabSession)
        .filter(RehabSession.patient_id == patient.id)
        .order_by(RehabSession.start_time.desc())
        .all()
    )
    return sessions


@router.post("/me/sessions", response_model=RehabSessionResponse, status_code=status.HTTP_201_CREATED)
def log_session(
    session_data: RehabSessionCreate,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """Logs a newly completed exercise session for the authenticated patient."""
    # Ensure therapy_plan belongs to this patient if provided
    if session_data.therapy_plan_id:
        plan = (
            db.query(TherapyPlan)
            .filter(TherapyPlan.id == session_data.therapy_plan_id, TherapyPlan.patient_id == patient.id)
            .first()
        )
        if not plan:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Therapy plan not found or not assigned to you",
            )

    new_session = RehabSession(
        patient_id=patient.id,
        therapy_plan_id=session_data.therapy_plan_id,
        exercise_type=session_data.exercise_type,
        start_time=session_data.start_time,
        end_time=session_data.end_time,
        duration_seconds=session_data.duration_seconds,
        completion_state=session_data.completion_state,
        metric_payload=session_data.metric_payload,
        tracking_quality=session_data.tracking_quality,
        model_version=session_data.model_version,
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    record_audit(
        db=db,
        action="LOG_REHAB_SESSION",
        resource_type="REHAB_SESSION",
        actor_id=patient.user_id,
        resource_id=new_session.id,
    )
    return new_session
