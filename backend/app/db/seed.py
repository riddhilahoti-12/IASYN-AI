import sys
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.session import SessionLocal, engine, Base
from app.models.user import User
from app.models.patient import PatientProfile
from app.models.doctor import DoctorProfile
from app.models.assignment import DoctorPatientAssignment
from app.models.therapy_plan import TherapyPlan
from app.models.session import RehabSession
from app.models.audit import AuditLog


def seed_database(db: Session) -> None:
    """
    Seeds fictional, non-PHI demonstration accounts and clinical protocols for IASYN AI.
    Safe to run repeatedly; existing accounts with seed emails will be updated or preserved.
    """
    print("Initializing database tables...")
    Base.metadata.create_all(bind=engine)

    password_hash = get_password_hash(settings.SEED_DEFAULT_PASSWORD)

    # 1. Seed Patient User & Profile
    patient_user = db.query(User).filter(User.email == settings.SEED_PATIENT_EMAIL).first()
    if not patient_user:
        patient_user = User(
            email=settings.SEED_PATIENT_EMAIL,
            hashed_password=password_hash,
            role="PATIENT",
            is_active=True,
        )
        db.add(patient_user)
        db.flush()
        print(f"Created Patient User: {patient_user.email}")
    else:
        patient_user.hashed_password = password_hash
        patient_user.is_active = True

    patient_profile = db.query(PatientProfile).filter(PatientProfile.user_id == patient_user.id).first()
    if not patient_profile:
        patient_profile = PatientProfile(
            user_id=patient_user.id,
            display_name="Elena Rostova (Fictional Demo Patient)",
            medical_id="IAS-2026-9042",
            phone="+1 (555) 234-5678",
            demographics={
                "age": 58,
                "gender": "Female",
                "diagnosis": "Right Hemiparetic Stroke Recovery",
                "affected_side": "Right Upper Limb",
                "admission_date": "2026-08-14",
            },
            rehab_goals=[
                "Achieve 90° active shoulder abduction without scapular elevation",
                "Reach functional independence in grooming and cup reaching",
                "Reduce compensatory trunk lean to under 10 degrees",
            ],
            consent_status=True,
            consent_timestamp=datetime.now(timezone.utc) - timedelta(days=60),
            baseline_rom={"shoulder_abduction_deg": 48, "elbow_extension_deg": 130},
            contraindications=[
                "Avoid forceful overhead passive stretching beyond 110°",
                "Cease repetitions immediately if VAS pain exceeds 4/10",
            ],
        )
        db.add(patient_profile)
        db.flush()
        print(f"Created Patient Profile: {patient_profile.display_name}")

    # 2. Seed Doctor User & Profile
    doctor_user = db.query(User).filter(User.email == settings.SEED_DOCTOR_EMAIL).first()
    if not doctor_user:
        doctor_user = User(
            email=settings.SEED_DOCTOR_EMAIL,
            hashed_password=password_hash,
            role="DOCTOR",
            is_active=True,
        )
        db.add(doctor_user)
        db.flush()
        print(f"Created Doctor User: {doctor_user.email}")
    else:
        doctor_user.hashed_password = password_hash
        doctor_user.is_active = True

    doctor_profile = db.query(DoctorProfile).filter(DoctorProfile.user_id == doctor_user.id).first()
    if not doctor_profile:
        doctor_profile = DoctorProfile(
            user_id=doctor_user.id,
            display_name="Dr. Marcus Vance, PT, DPT (Demo Clinician)",
            license_number="PT-NY-98421-DEMO",
            specialty="Neurological Physical Therapy & Motor Recovery",
            department="Neuro-Rehabilitation Sciences",
            verification_status="VERIFIED",
        )
        db.add(doctor_profile)
        db.flush()
        print(f"Created Doctor Profile: {doctor_profile.display_name}")

    # 3. Seed Admin User
    admin_user = db.query(User).filter(User.email == settings.SEED_ADMIN_EMAIL).first()
    if not admin_user:
        admin_user = User(
            email=settings.SEED_ADMIN_EMAIL,
            hashed_password=password_hash,
            role="ADMIN",
            is_active=True,
        )
        db.add(admin_user)
        db.flush()
        print(f"Created Admin User: {admin_user.email}")
    else:
        admin_user.hashed_password = password_hash
        admin_user.is_active = True

    # 4. Doctor-Patient Clinical Assignment
    assignment = (
        db.query(DoctorPatientAssignment)
        .filter(
            DoctorPatientAssignment.doctor_id == doctor_profile.id,
            DoctorPatientAssignment.patient_id == patient_profile.id,
        )
        .first()
    )
    if not assignment:
        assignment = DoctorPatientAssignment(
            doctor_id=doctor_profile.id,
            patient_id=patient_profile.id,
            status="ACTIVE",
            assigned_at=datetime.now(timezone.utc) - timedelta(days=45),
        )
        db.add(assignment)
        db.flush()
        print(f"Assigned Patient {patient_profile.display_name} to Doctor {doctor_profile.display_name}")

    # 5. Seed Clinician-Approved Therapy Plan
    therapy_plan = (
        db.query(TherapyPlan)
        .filter(
            TherapyPlan.patient_id == patient_profile.id,
            TherapyPlan.doctor_id == doctor_profile.id,
        )
        .first()
    )
    if not therapy_plan:
        therapy_plan = TherapyPlan(
            patient_id=patient_profile.id,
            doctor_id=doctor_profile.id,
            title="Targeted Right Shoulder Abduction & Motor Alignment Protocol",
            therapy_type="Neurological Post-Stroke",
            diagnosis="Right hemiparesis secondary to ischemic MCA stroke",
            exercise_definitions=[
                {
                    "id": "ex-01",
                    "name": "Coronal Plane Shoulder Abduction",
                    "target_joint": "Glenohumeral Joint",
                    "starting_position": "Seated upright with neutral spine",
                    "target_rom": 90,
                    "target_reps": 10,
                    "hold_sec": 3,
                },
                {
                    "id": "ex-02",
                    "name": "Scapular Retraction & Alignment",
                    "target_joint": "Scapulothoracic Articulation",
                    "starting_position": "Seated upright, arms at sides 90° elbow flexion",
                    "target_rom": 45,
                    "target_reps": 12,
                    "hold_sec": 2,
                },
            ],
            prescribed_reps_sets={
                "sets_per_session": 3,
                "repetitions_per_set": 10,
                "hold_duration_sec": 3,
                "sessions_per_week": 5,
            },
            clinical_targets={
                "target_rom_degrees": 90,
                "max_trunk_compensation_degrees": 10,
                "target_form_adherence_percent": 85,
                "allowable_pain_vas": 3,
            },
            restrictions=[
                "Avoid forceful passive elevation beyond 110 degrees",
                "Ensure minimum 90-second rest intervals between sets",
                "Stop immediately if sharp anterior shoulder impingement pain occurs",
            ],
            approval_status="APPROVED",
        )
        db.add(therapy_plan)
        db.flush()
        print(f"Created Approved Therapy Plan: {therapy_plan.title}")

    # 6. Seed Realistic Completed Rehab Sessions
    existing_sessions = db.query(RehabSession).filter(RehabSession.patient_id == patient_profile.id).count()
    if existing_sessions == 0:
        session1 = RehabSession(
            patient_id=patient_profile.id,
            therapy_plan_id=therapy_plan.id,
            exercise_type="Coronal Plane Shoulder Abduction",
            start_time=datetime.now(timezone.utc) - timedelta(days=2, hours=3),
            end_time=datetime.now(timezone.utc) - timedelta(days=2, hours=2, minutes=45),
            duration_seconds=900,
            completion_state="COMPLETED",
            metric_payload={
                "repetitions_completed": 10,
                "target_repetitions": 10,
                "rom_reached_degrees": 78.4,
                "target_rom_degrees": 90.0,
                "adherence_score": 88.5,
                "compensation_events": 2,
                "avg_trunk_lean_deg": 6.2,
                "reported_pain_vas": 2,
            },
            tracking_quality={
                "confidence_score": 0.95,
                "occlusions": 0,
                "fps_avg": 29.8,
                "camera_stability": "OPTIMAL",
            },
            model_version="iasyn-pose-v1.4",
            clinician_feedback="Great progression on shoulder abduction. Observed minor compensatory trunk lean on reps 8 and 9; keep torso engaged.",
            clinician_reviewed=True,
        )

        session2 = RehabSession(
            patient_id=patient_profile.id,
            therapy_plan_id=therapy_plan.id,
            exercise_type="Coronal Plane Shoulder Abduction",
            start_time=datetime.now(timezone.utc) - timedelta(days=1, hours=4),
            end_time=datetime.now(timezone.utc) - timedelta(days=1, hours=3, minutes=43),
            duration_seconds=1020,
            completion_state="COMPLETED",
            metric_payload={
                "repetitions_completed": 10,
                "target_repetitions": 10,
                "rom_reached_degrees": 83.1,
                "target_rom_degrees": 90.0,
                "adherence_score": 92.4,
                "compensation_events": 1,
                "avg_trunk_lean_deg": 4.8,
                "reported_pain_vas": 1,
            },
            tracking_quality={
                "confidence_score": 0.97,
                "occlusions": 0,
                "fps_avg": 30.0,
                "camera_stability": "OPTIMAL",
            },
            model_version="iasyn-pose-v1.4",
            clinician_feedback="Noticeable improvement in scapular stabilization and smooth velocity curve.",
            clinician_reviewed=True,
        )
        db.add_all([session1, session2])
        print("Created demonstration rehabilitation sessions with verified telemetry.")

    # 7. Initial Seed Audit Log
    seed_log = AuditLog(
        actor_id=admin_user.id,
        actor_email=admin_user.email,
        actor_role="ADMIN",
        action="SYSTEM_DATABASE_INITIALIZED",
        resource_type="SYSTEM",
        resource_id="iasyn-db-init",
        timestamp=datetime.now(timezone.utc),
        metadata_json={
            "description": "Database seeded with demonstration clinical accounts",
            "seed_patient": settings.SEED_PATIENT_EMAIL,
            "seed_doctor": settings.SEED_DOCTOR_EMAIL,
            "seed_admin": settings.SEED_ADMIN_EMAIL,
        },
    )
    db.add(seed_log)

    db.commit()
    print("Database seeding completed successfully!")


if __name__ == "__main__":
    session = SessionLocal()
    try:
        seed_database(session)
    finally:
        session.close()
