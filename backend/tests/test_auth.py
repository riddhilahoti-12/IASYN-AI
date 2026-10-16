import pytest
from datetime import timedelta
from app.core.security import create_access_token


def test_correct_login(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "patient.a@iasyn.org", "password": "ClinicalTest123!"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "patient.a@iasyn.org"
    assert data["user"]["role"] == "PATIENT"
    assert data["user"]["display_name"] == "Patient Alpha"
    assert "iasyn_access_token" in response.cookies


def test_incorrect_password(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "patient.a@iasyn.org", "password": "WrongPassword999!"},
    )
    assert response.status_code == 401
    assert "Invalid email or password" in response.json()["detail"]


def test_unregistered_email(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "nonexistent@iasyn.org", "password": "ClinicalTest123!"},
    )
    assert response.status_code == 401


def test_get_current_user_me(client):
    # Log in as doctor
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": "doctor.a@iasyn.org", "password": "ClinicalTest123!"},
    )
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]

    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    user_data = response.json()
    assert user_data["email"] == "doctor.a@iasyn.org"
    assert user_data["role"] == "DOCTOR"
    assert user_data["display_name"] == "Dr. Arthur Vance"
    assert user_data["profile"]["license_number"] == "LIC-DOC-A"


def test_expired_session_handling(client):
    # Create an expired token (negative delta)
    expired_token = create_access_token(
        subject="usr-patient-a",
        role="PATIENT",
        expires_delta=timedelta(seconds=-10),
    )
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {expired_token}"},
    )
    assert response.status_code == 401
    assert "expired" in response.json()["detail"].lower()


def test_logout(client):
    # First log in
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": "patient.a@iasyn.org", "password": "ClinicalTest123!"},
    )
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]

    logout_res = client.post(
        "/api/v1/auth/logout",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert logout_res.status_code == 200
    assert "Successfully logged out" in logout_res.json()["message"]
    # Verify cookie is cleared
    cookie = logout_res.headers.get("set-cookie", "")
    assert "iasyn_access_token" in cookie
