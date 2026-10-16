import pytest


def get_token(client, email, password="ClinicalTest123!"):
    res = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert res.status_code == 200, f"Login failed for {email}: {res.text}"
    return res.json()["access_token"]


def test_patient_route_protection(client):
    patient_token = get_token(client, "patient.a@iasyn.org")
    doctor_token = get_token(client, "doctor.a@iasyn.org")

    # Patient can access /api/v1/patients/me
    res_p = client.get("/api/v1/patients/me", headers={"Authorization": f"Bearer {patient_token}"})
    assert res_p.status_code == 200
    assert res_p.json()["medical_id"] == "MED-A-001"

    # Doctor trying to access /api/v1/patients/me receives 403 Forbidden
    res_d = client.get("/api/v1/patients/me", headers={"Authorization": f"Bearer {doctor_token}"})
    assert res_d.status_code == 403


def test_doctor_route_protection(client):
    patient_token = get_token(client, "patient.a@iasyn.org")
    doctor_token = get_token(client, "doctor.a@iasyn.org")

    # Doctor can access /api/v1/doctors/patients
    res_d = client.get("/api/v1/doctors/patients", headers={"Authorization": f"Bearer {doctor_token}"})
    assert res_d.status_code == 200
    assert len(res_d.json()) >= 1

    # Patient trying to access /api/v1/doctors/patients receives 403 Forbidden
    res_p = client.get("/api/v1/doctors/patients", headers={"Authorization": f"Bearer {patient_token}"})
    assert res_p.status_code == 403


def test_admin_route_protection(client):
    patient_token = get_token(client, "patient.a@iasyn.org")
    doctor_token = get_token(client, "doctor.a@iasyn.org")
    admin_token = get_token(client, "admin@iasyn.org")

    # Admin accesses /api/v1/admin/users and /api/v1/admin/stats
    res_a = client.get("/api/v1/admin/users", headers={"Authorization": f"Bearer {admin_token}"})
    assert res_a.status_code == 200

    res_stats = client.get("/api/v1/admin/stats", headers={"Authorization": f"Bearer {admin_token}"})
    assert res_stats.status_code == 200

    # Doctor receives 403
    res_d = client.get("/api/v1/admin/users", headers={"Authorization": f"Bearer {doctor_token}"})
    assert res_d.status_code == 403

    # Patient receives 403
    res_p = client.get("/api/v1/admin/users", headers={"Authorization": f"Bearer {patient_token}"})
    assert res_p.status_code == 403


def test_patient_cross_access_isolation(client):
    patient_b_token = get_token(client, "patient.b@iasyn.org")

    # Patient B attempts to access Patient A's therapy plan
    res = client.get("/api/v1/therapy-plans/plan-patient-a", headers={"Authorization": f"Bearer {patient_b_token}"})
    assert res.status_code == 403
    assert "Access denied" in res.json()["detail"]


def test_doctor_unassigned_patient_access_isolation(client):
    # Doctor B is NOT assigned to Patient A
    doctor_b_token = get_token(client, "doctor.b@iasyn.org")

    res = client.get("/api/v1/doctors/patients/prof-patient-a", headers={"Authorization": f"Bearer {doctor_b_token}"})
    assert res.status_code == 403
    assert "not assigned to your clinical care roster" in res.json()["detail"]
