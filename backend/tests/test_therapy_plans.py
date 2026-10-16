import pytest


def get_token(client, email, password="ClinicalTest123!"):
    res = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert res.status_code == 200, f"Login failed for {email}: {res.text}"
    return res.json()["access_token"]


def test_doctor_creates_plan_for_assigned_patient(client):
    doc_a_token = get_token(client, "doctor.a@iasyn.org")

    payload = {
        "patient_id": "prof-patient-a",
        "title": "Subacute Upper Extremity Motor Protocol",
        "therapy_type": "Neurological",
        "diagnosis": "Right hemiparesis",
        "exercise_definitions": [{"name": "Elbow Flexion", "target_rom": 120}],
        "prescribed_reps_sets": {"sets": 3, "reps": 12},
        "clinical_targets": {"target_rom": 120},
        "restrictions": ["Do not force terminal flexion"],
        "approval_status": "DRAFT",
    }

    res = client.post(
        "/api/v1/therapy-plans",
        json=payload,
        headers={"Authorization": f"Bearer {doc_a_token}"},
    )
    assert res.status_code == 201
    data = res.json()
    assert data["title"] == "Subacute Upper Extremity Motor Protocol"
    assert data["approval_status"] == "DRAFT"
    assert data["patient_id"] == "prof-patient-a"


def test_doctor_cannot_create_plan_for_unassigned_patient(client):
    doc_b_token = get_token(client, "doctor.b@iasyn.org")

    # Doctor B is not assigned to Patient A
    payload = {
        "patient_id": "prof-patient-a",
        "title": "Unauthorized Plan Creation Attempt",
        "therapy_type": "Orthopedic",
        "diagnosis": "Impingement",
        "exercise_definitions": [],
    }

    res = client.post(
        "/api/v1/therapy-plans",
        json=payload,
        headers={"Authorization": f"Bearer {doc_b_token}"},
    )
    assert res.status_code == 403
    assert "not assigned" in res.json()["detail"].lower()


def test_invalid_therapy_plan_input(client):
    doc_a_token = get_token(client, "doctor.a@iasyn.org")

    # Missing title and diagnosis (violates min_length 3)
    payload = {
        "patient_id": "prof-patient-a",
        "title": "",
        "therapy_type": "",
        "diagnosis": "",
    }

    res = client.post(
        "/api/v1/therapy-plans",
        json=payload,
        headers={"Authorization": f"Bearer {doc_a_token}"},
    )
    assert res.status_code == 422


def test_doctor_approves_plan(client):
    doc_a_token = get_token(client, "doctor.a@iasyn.org")

    # First create a draft plan
    create_res = client.post(
        "/api/v1/therapy-plans",
        json={
            "patient_id": "prof-patient-a",
            "title": "Draft Protocol For Verification",
            "therapy_type": "Neurological",
            "diagnosis": "Motor ataxia",
            "approval_status": "DRAFT",
        },
        headers={"Authorization": f"Bearer {doc_a_token}"},
    )
    assert create_res.status_code == 201
    plan_id = create_res.json()["id"]

    # Now approve it
    approve_res = client.put(
        f"/api/v1/therapy-plans/{plan_id}/approve",
        headers={"Authorization": f"Bearer {doc_a_token}"},
    )
    assert approve_res.status_code == 200
    assert approve_res.json()["approval_status"] == "APPROVED"
