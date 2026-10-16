from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class RehabSessionBase(BaseModel):
    exercise_type: str = Field(..., min_length=2)
    start_time: datetime
    end_time: datetime
    duration_seconds: int = Field(default=0, ge=0)
    completion_state: str = "COMPLETED"  # COMPLETED, ABORTED_FATIGUE, ABORTED_PAIN
    metric_payload: Dict[str, Any] = Field(default_factory=dict)
    tracking_quality: Dict[str, Any] = Field(default_factory=dict)
    model_version: str = "iasyn-pose-v1.4"


class RehabSessionCreate(RehabSessionBase):
    patient_id: Optional[str] = None
    therapy_plan_id: Optional[str] = None


class RehabSessionFeedback(BaseModel):
    clinician_feedback: str = Field(..., min_length=2)
    clinician_reviewed: bool = True


class RehabSessionResponse(RehabSessionBase):
    id: str
    patient_id: str
    therapy_plan_id: Optional[str] = None
    clinician_feedback: Optional[str] = None
    clinician_reviewed: bool = False

    model_config = ConfigDict(from_attributes=True)
