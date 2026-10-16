import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base


class TherapyPlan(Base):
    __tablename__ = "therapy_plans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    patient_id = Column(String(36), ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    doctor_id = Column(String(36), ForeignKey("doctor_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    therapy_type = Column(String(128), nullable=False)  # e.g., "Neurological Post-Stroke", "Orthopedic Rotator Cuff"
    diagnosis = Column(String(255), nullable=False)
    exercise_definitions = Column(JSON, nullable=False, default=list)  # list of exercise items
    prescribed_reps_sets = Column(JSON, nullable=False, default=dict)  # {"sets": 3, "reps": 12, "hold_sec": 3}
    clinical_targets = Column(JSON, nullable=False, default=dict)     # {"target_rom": 120, "max_compensation_deg": 10, "frequency_days_per_week": 5}
    restrictions = Column(JSON, nullable=False, default=list)          # ["Do not exceed 130° without spotter", "Stop if VAS pain > 4"]
    approval_status = Column(String(32), nullable=False, default="DRAFT")  # DRAFT, APPROVED, ARCHIVED
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationships
    patient = relationship("PatientProfile", back_populates="therapy_plans")
    doctor = relationship("DoctorProfile", back_populates="prescribed_plans")
    rehab_sessions = relationship("RehabSession", back_populates="therapy_plan")
