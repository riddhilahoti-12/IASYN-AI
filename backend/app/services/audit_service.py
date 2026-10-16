from datetime import datetime, timezone
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from app.models.audit import AuditLog


def record_audit(
    db: Session,
    action: str,
    resource_type: str,
    actor_id: Optional[str] = None,
    actor_email: Optional[str] = None,
    actor_role: Optional[str] = None,
    resource_id: Optional[str] = None,
    metadata_json: Optional[Dict[str, Any]] = None,
) -> AuditLog:
    """Logs an auditable security or clinical action in compliance with healthcare audit guidelines."""
    log_entry = AuditLog(
        actor_id=actor_id,
        actor_email=actor_email,
        actor_role=actor_role,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        timestamp=datetime.now(timezone.utc),
        metadata_json=metadata_json or {},
    )
    db.add(log_entry)
    db.commit()
    db.refresh(log_entry)
    return log_entry
