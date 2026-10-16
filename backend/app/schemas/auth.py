from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=5, description="User email address")
    password: str = Field(..., min_length=6, description="User password")


class UserProfileSummary(BaseModel):
    id: str
    email: str
    role: str  # PATIENT, DOCTOR, ADMIN
    display_name: str
    is_active: bool
    medical_id: Optional[str] = None
    license_number: Optional[str] = None
    verification_status: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserProfileSummary


class LogoutResponse(BaseModel):
    message: str = "Successfully logged out"


class CurrentUserResponse(BaseModel):
    id: str
    email: str
    role: str
    is_active: bool
    display_name: str
    profile: Optional[Dict[str, Any]] = None

    model_config = ConfigDict(from_attributes=True)
