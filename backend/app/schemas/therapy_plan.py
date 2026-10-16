from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class TherapyPlanBase(BaseModel):
    title: str = Field(..., min_length=3)
    therapy_type: str = Field(..., min_length=2)
    diagnosis: str = Field(..., min_length=3)
    exercise_definitions: List[Dict[str, Any]] = Field(default_factory=list)
    prescribed_reps_sets: Dict[str, Any] = Field(default_factory=dict)
    clinical_targets: Dict[str, Any] = Field(default_factory=dict)
    restrictions: List[str] = Field(default_factory=list)
    approval_status: str = "DRAFT"  # DRAFT, APPROVED, ARCHIVED


class TherapyPlanCreate(TherapyPlanBase):
    patient_id: str


class TherapyPlanUpdate(BaseModel):
    title: Optional[str] = None
    therapy_type: Optional[str] = None
    diagnosis: Optional[str] = None
    exercise_definitions: Optional[List[Dict[str, Any]]] = None
    prescribed_reps_sets: Optional[Dict[str, Any]] = None
    clinical_targets: Optional[Dict[str, Any]] = None
    restrictions: Optional[List[str]] = None
    approval_status: Optional[str] = None


class TherapyPlanResponse(TherapyPlanBase):
    id: str
    patient_id: str
    doctor_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
