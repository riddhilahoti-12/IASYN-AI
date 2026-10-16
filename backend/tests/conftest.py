import pytest
from datetime import datetime, timezone
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.session import Base
from app.api.deps import get_db
from app.main import app
from app.models.user import User
from app.models.patient import PatientProfile
from app.models.doctor import DoctorProfile
from app.models.assignment import DoctorPatientAssignment
from app.models.therapy_plan import TherapyPlan
from app.models.session import RehabSession

TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session")
def setup_db():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def db(setup_db):
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    # Seed test fixtures
    pw_hash = get_password_hash("ClinicalTest123!")

    # Patient A
    p_user_a = User(
        id="usr-patient-a",
        email="patient.a@iasyn.org",
        hashed_password=pw_hash,
        role="PATIENT",
        is_active=True,
    )
    p_profile_a = PatientProfile(
        id="prof-patient-a",
        user_id=p_user_a.id,
        display_name="Patient Alpha",
        medical_id="MED-A-001",
        phone="+1-555-0101",
        demographics={"age": 52, "condition": "Post-stroke"},
        consent_status=True,
    )

    # Patient B
    p_user_b = User(
        id="usr-patient-b",
        email="patient.b@iasyn.org",
        hashed_password=pw_hash,
        role="PATIENT",
        is_active=True,
    )
    p_profile_b = PatientProfile(
        id="prof-patient-b",
        user_id=p_user_b.id,
        display_name="Patient Beta",
        medical_id="MED-B-002",
        phone="+1-555-0102",
        demographics={"age": 61, "condition": "Rotator cuff"},
        consent_status=True,
    )

    # Doctor A
    d_user_a = User(
        id="usr-doctor-a",
        email="doctor.a@iasyn.org",
        hashed_password=pw_hash,
        role="DOCTOR",
        is_active=True,
    )
    d_profile_a = DoctorProfile(
        id="prof-doctor-a",
        user_id=d_user_a.id,
        display_name="Dr. Arthur Vance",
        license_number="LIC-DOC-A",
        specialty="Neuro-Rehab",
        department="Physical Therapy",
        verification_status="VERIFIED",
    )

    # Doctor B (Unassigned doctor)
    d_user_b = User(
        id="usr-doctor-b",
        email="doctor.b@iasyn.org",
        hashed_password=pw_hash,
        role="DOCTOR",
        is_active=True,
    )
    d_profile_b = DoctorProfile(
        id="prof-doctor-b",
        user_id=d_user_b.id,
        display_name="Dr. Beatrice Thorne",
        license_number="LIC-DOC-B",
        specialty="Orthopedic Rehab",
        department="Physical Therapy",
        verification_status="VERIFIED",
    )

    # Admin
    admin_user = User(
        id="usr-admin",
        email="admin@iasyn.org",
        hashed_password=pw_hash,
        role="ADMIN",
        is_active=True,
    )

    session.add_all([p_user_a, p_profile_a, p_user_b, p_profile_b, d_user_a, d_profile_a, d_user_b, d_profile_b, admin_user])
    session.flush()

    # Assign Patient A to Doctor A only
    assignment = DoctorPatientAssignment(
        doctor_id=d_profile_a.id,
        patient_id=p_profile_a.id,
        status="ACTIVE",
    )
    session.add(assignment)

    # Therapy plan for Patient A
    plan_a = TherapyPlan(
        id="plan-patient-a",
        patient_id=p_profile_a.id,
        doctor_id=d_profile_a.id,
        title="Shoulder Abduction Protocol",
        therapy_type="Post-Stroke",
        diagnosis="Right hemiparesis",
        exercise_definitions=[{"name": "Abduction", "target_rom": 90}],
        prescribed_reps_sets={"sets": 3, "reps": 10},
        clinical_targets={"target_rom": 90},
        restrictions=["Limit range to 90 degrees"],
        approval_status="APPROVED",
    )
    session.add(plan_a)
    session.commit()

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db):
    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
