import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.session import Base


class DoctorPatientAssignment(Base):
    __tablename__ = "doctor_patient_assignments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    doctor_id = Column(String(36), ForeignKey("doctor_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    patient_id = Column(String(36), ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(32), nullable=False, default="ACTIVE")  # ACTIVE, TRANSFERRED, COMPLETED
    assigned_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        UniqueConstraint("doctor_id", "patient_id", name="uq_doctor_patient_assignment"),
    )

    # Relationships
    doctor = relationship("DoctorProfile", back_populates="patient_assignments")
    patient = relationship("PatientProfile", back_populates="doctor_assignments")
