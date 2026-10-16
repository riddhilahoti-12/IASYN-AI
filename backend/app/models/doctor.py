import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base


class DoctorProfile(Base):
    __tablename__ = "doctor_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    display_name = Column(String(255), nullable=False)
    license_number = Column(String(64), unique=True, nullable=False, index=True)
    specialty = Column(String(128), nullable=False, default="Physical Therapy & Neuro-Rehabilitation")
    department = Column(String(128), nullable=False, default="Neuro-Motor Rehabilitation")
    verification_status = Column(String(32), nullable=False, default="VERIFIED")  # VERIFIED, PENDING_REVIEW, SUSPENDED

    # Relationships
    user = relationship("User", back_populates="doctor_profile")
    patient_assignments = relationship("DoctorPatientAssignment", back_populates="doctor", cascade="all, delete-orphan")
    prescribed_plans = relationship("TherapyPlan", back_populates="doctor", cascade="all, delete-orphan")
