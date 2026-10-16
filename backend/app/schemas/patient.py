from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict


class PatientProfileBase(BaseModel):
    display_name: str
    medical_id: str
    phone: Optional[str] = None
    demographics: Optional[Dict[str, Any]] = None
    rehab_goals: Optional[List[str]] = None
    consent_status: bool = True
    baseline_rom: Optional[Dict[str, Any]] = None
    contraindications: Optional[List[str]] = None


class PatientProfileCreate(PatientProfileBase):
    user_id: str


class PatientProfileUpdate(BaseModel):
    display_name: Optional[str] = None
    phone: Optional[str] = None
    demographics: Optional[Dict[str, Any]] = None
    rehab_goals: Optional[List[str]] = None
    consent_status: Optional[bool] = None
    baseline_rom: Optional[Dict[str, Any]] = None
    contraindications: Optional[List[str]] = None


class PatientProfileResponse(PatientProfileBase):
    id: str
    user_id: str
    consent_timestamp: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class PatientDetailResponse(PatientProfileResponse):
    email: Optional[str] = None
    assigned_doctor_name: Optional[str] = None
    active_plan_title: Optional[str] = None
    recent_sessions_count: int = 0
