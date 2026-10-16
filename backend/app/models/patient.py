import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base


class PatientProfile(Base):
    __tablename__ = "patient_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    display_name = Column(String(255), nullable=False)
    medical_id = Column(String(64), unique=True, nullable=False, index=True)
    phone = Column(String(64), nullable=True)
    demographics = Column(JSON, nullable=True, default=dict)
    rehab_goals = Column(JSON, nullable=True, default=list)
    consent_status = Column(Boolean, default=True, nullable=False)
    consent_timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=True)
    baseline_rom = Column(JSON, nullable=True, default=dict)
    contraindications = Column(JSON, nullable=True, default=list)

    # Relationships
    user = relationship("User", back_populates="patient_profile")
    doctor_assignments = relationship("DoctorPatientAssignment", back_populates="patient", cascade="all, delete-orphan")
    therapy_plans = relationship("TherapyPlan", back_populates="patient", cascade="all, delete-orphan")
    rehab_sessions = relationship("RehabSession", back_populates="patient", cascade="all, delete-orphan")
