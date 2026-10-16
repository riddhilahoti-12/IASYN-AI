from typing import Optional
from pydantic import BaseModel, ConfigDict


class DoctorProfileBase(BaseModel):
    display_name: str
    license_number: str
    specialty: str
    department: str
    verification_status: str = "VERIFIED"


class DoctorProfileCreate(DoctorProfileBase):
    user_id: str


class DoctorProfileResponse(DoctorProfileBase):
    id: str
    user_id: str

    model_config = ConfigDict(from_attributes=True)


class DoctorVerificationUpdate(BaseModel):
    verification_status: str  # VERIFIED, PENDING_REVIEW, SUSPENDED
