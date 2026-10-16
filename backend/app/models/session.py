import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base


class RehabSession(Base):
    __tablename__ = "rehab_sessions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    patient_id = Column(String(36), ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    therapy_plan_id = Column(String(36), ForeignKey("therapy_plans.id", ondelete="SET NULL"), nullable=True, index=True)
    exercise_type = Column(String(128), nullable=False)
    start_time = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    end_time = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    duration_seconds = Column(Integer, nullable=False, default=0)
    completion_state = Column(String(32), nullable=False, default="COMPLETED")  # COMPLETED, ABORTED_FATIGUE, ABORTED_PAIN
    metric_payload = Column(JSON, nullable=False, default=dict)
    # metric_payload: {"rom_reached": 114, "adherence_score": 91, "repetitions_completed": 12, "target_reps": 12, "compensation_events": 1, "pain_reported": 2}
    tracking_quality = Column(JSON, nullable=False, default=dict)
    # tracking_quality: {"confidence_score": 0.94, "occlusions": 0, "fps_avg": 29.8, "lighting": "adequate"}
    model_version = Column(String(64), nullable=False, default="iasyn-pose-v1.4")
    clinician_feedback = Column(String(1000), nullable=True)
    clinician_reviewed = Column(Boolean, nullable=False, default=False)

    # Relationships
    patient = relationship("PatientProfile", back_populates="rehab_sessions")
    therapy_plan = relationship("TherapyPlan", back_populates="rehab_sessions")
