from datetime import datetime
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, ConfigDict


class AuditLogResponse(BaseModel):
    id: str
    actor_id: Optional[str] = None
    actor_email: Optional[str] = None
    actor_role: Optional[str] = None
    action: str
    resource_type: str
    resource_id: Optional[str] = None
    timestamp: datetime
    metadata_json: Optional[Dict[str, Any]] = None

    model_config = ConfigDict(from_attributes=True)


class SystemStatsResponse(BaseModel):
    total_users: int
    total_patients: int
    total_doctors: int
    total_active_plans: int
    total_sessions_completed: int
    total_audit_events: int
    environment: str
    version: str


class AdminUserItem(BaseModel):
    id: str
    email: str
    role: str
    display_name: str
    is_active: bool
    created_at: datetime
    verification_status: Optional[str] = None
    medical_id: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
