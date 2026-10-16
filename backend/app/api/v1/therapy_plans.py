from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user, get_current_doctor
from app.models.user import User
from app.models.doctor import DoctorProfile
from app.models.patient import PatientProfile
from app.models.assignment import DoctorPatientAssignment
from app.models.therapy_plan import TherapyPlan
from app.schemas.therapy_plan import TherapyPlanCreate, TherapyPlanUpdate, TherapyPlanResponse
from app.services.audit_service import record_audit

router = APIRouter(prefix="/therapy-plans", tags=["Therapy Plans"])


@router.post("", response_model=TherapyPlanResponse, status_code=status.HTTP_201_CREATED)
def create_therapy_plan(
    plan_data: TherapyPlanCreate,
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """
    Doctor creates a new rehabilitation plan for an assigned patient.
    Input validation ensures valid therapy type, title, and diagnosis.
    """
    # Verify patient assignment
    assignment = (
        db.query(DoctorPatientAssignment)
        .filter(
            DoctorPatientAssignment.doctor_id == doctor.id,
            DoctorPatientAssignment.patient_id == plan_data.patient_id,
            DoctorPatientAssignment.status == "ACTIVE",
        )
        .first()
    )
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot prescribe therapy plan: Patient is not assigned to your clinical roster.",
        )

    new_plan = TherapyPlan(
        patient_id=plan_data.patient_id,
        doctor_id=doctor.id,
        title=plan_data.title.strip(),
        therapy_type=plan_data.therapy_type.strip(),
        diagnosis=plan_data.diagnosis.strip(),
        exercise_definitions=plan_data.exercise_definitions or [],
        prescribed_reps_sets=plan_data.prescribed_reps_sets or {},
        clinical_targets=plan_data.clinical_targets or {},
        restrictions=plan_data.restrictions or [],
        approval_status=plan_data.approval_status or "DRAFT",
    )
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    record_audit(
        db=db,
        action="CREATE_THERAPY_PLAN",
        resource_type="THERAPY_PLAN",
        actor_id=doctor.user_id,
        resource_id=new_plan.id,
        metadata_json={"title": new_plan.title, "approval_status": new_plan.approval_status},
    )
    return new_plan


@router.get("/{plan_id}", response_model=TherapyPlanResponse)
def get_therapy_plan(
    plan_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Retrieves a therapy plan if the user is the assigned patient or the prescribing doctor."""
    plan = db.query(TherapyPlan).filter(TherapyPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Therapy plan not found")

    # Access control
    if current_user.role.upper() == "PATIENT":
        patient = db.query(PatientProfile).filter(PatientProfile.user_id == current_user.id).first()
        if not patient or plan.patient_id != patient.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to this therapy plan")
    elif current_user.role.upper() == "DOCTOR":
        doctor = db.query(DoctorProfile).filter(DoctorProfile.user_id == current_user.id).first()
        if not doctor or plan.doctor_id != doctor.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to this therapy plan")

    return plan


@router.put("/{plan_id}/approve", response_model=TherapyPlanResponse)
def approve_therapy_plan(
    plan_id: str,
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """Clinician approves a draft therapy plan for patient execution."""
    plan = db.query(TherapyPlan).filter(TherapyPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Therapy plan not found")

    if plan.doctor_id != doctor.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the prescribing doctor can approve this plan")

    plan.approval_status = "APPROVED"
    db.commit()
    db.refresh(plan)

    record_audit(
        db=db,
        action="APPROVE_THERAPY_PLAN",
        resource_type="THERAPY_PLAN",
        actor_id=doctor.user_id,
        resource_id=plan.id,
    )
    return plan


@router.put("/{plan_id}", response_model=TherapyPlanResponse)
def update_therapy_plan(
    plan_id: str,
    update_data: TherapyPlanUpdate,
    doctor: DoctorProfile = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """Updates exercise definitions, targets, or restrictions on a therapy plan."""
    plan = db.query(TherapyPlan).filter(TherapyPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Therapy plan not found")

    if plan.doctor_id != doctor.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot edit a plan prescribed by another clinician")

    if update_data.title is not None:
        plan.title = update_data.title
    if update_data.therapy_type is not None:
        plan.therapy_type = update_data.therapy_type
    if update_data.diagnosis is not None:
        plan.diagnosis = update_data.diagnosis
    if update_data.exercise_definitions is not None:
        plan.exercise_definitions = update_data.exercise_definitions
    if update_data.prescribed_reps_sets is not None:
        plan.prescribed_reps_sets = update_data.prescribed_reps_sets
    if update_data.clinical_targets is not None:
        plan.clinical_targets = update_data.clinical_targets
    if update_data.restrictions is not None:
        plan.restrictions = update_data.restrictions
    if update_data.approval_status is not None:
        plan.approval_status = update_data.approval_status

    db.commit()
    db.refresh(plan)

    record_audit(
        db=db,
        action="UPDATE_THERAPY_PLAN",
        resource_type="THERAPY_PLAN",
        actor_id=doctor.user_id,
        resource_id=plan.id,
    )
    return plan
