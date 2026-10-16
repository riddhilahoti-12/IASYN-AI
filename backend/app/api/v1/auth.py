from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import verify_password, create_access_token
from app.api.deps import get_db, get_current_user, get_token_from_request
from app.models.user import User
from app.models.patient import PatientProfile
from app.models.doctor import DoctorProfile
from app.schemas.auth import LoginRequest, TokenResponse, LogoutResponse, CurrentUserResponse, UserProfileSummary
from app.services.audit_service import record_audit

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse)
def login(
    login_data: LoginRequest,
    response: Response,
    request: Request,
    db: Session = Depends(get_db),
):
    """
    Authenticates a user with email and password.
    Returns a JWT access token and sets a secure HttpOnly cookie.
    Derives role strictly from the authenticated database user record.
    """
    email_clean = login_data.email.strip().lower()
    user = db.query(User).filter(User.email == email_clean).first()

    if not user or not verify_password(login_data.password, user.hashed_password):
        # Audit failed login attempt
        record_audit(
            db=db,
            action="AUTH_LOGIN_FAILED",
            resource_type="USER",
            actor_email=email_clean,
            metadata_json={"ip": request.client.host if request.client else "unknown", "reason": "invalid_credentials"},
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive or suspended. Please contact clinic administration.",
        )

    # Derive role and profile details
    display_name = user.email.split("@")[0].capitalize()
    medical_id = None
    license_number = None
    verification_status = None

    if user.role.upper() == "PATIENT":
        patient = db.query(PatientProfile).filter(PatientProfile.user_id == user.id).first()
        if patient:
            display_name = patient.display_name
            medical_id = patient.medical_id
    elif user.role.upper() == "DOCTOR":
        doctor = db.query(DoctorProfile).filter(DoctorProfile.user_id == user.id).first()
        if doctor:
            display_name = doctor.display_name
            license_number = doctor.license_number
            verification_status = doctor.verification_status
    elif user.role.upper() == "ADMIN":
        display_name = "Clinical Administrator"

    token = create_access_token(subject=user.id, role=user.role.upper())

    # Set secure HttpOnly cookie
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        samesite="lax",
        secure=False,  # Set to True in production HTTPS
        path="/",
    )

    # Record successful login audit
    record_audit(
        db=db,
        action="AUTH_LOGIN_SUCCESS",
        resource_type="USER",
        actor_id=user.id,
        actor_email=user.email,
        actor_role=user.role,
        resource_id=user.id,
        metadata_json={"ip": request.client.host if request.client else "unknown"},
    )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=UserProfileSummary(
            id=user.id,
            email=user.email,
            role=user.role.upper(),
            display_name=display_name,
            is_active=user.is_active,
            medical_id=medical_id,
            license_number=license_number,
            verification_status=verification_status,
        ),
    )


@router.post("/logout", response_model=LogoutResponse)
def logout(
    response: Response,
    request: Request,
    db: Session = Depends(get_db),
    token: str = Depends(get_token_from_request),
):
    """
    Logs out the current session and clears the secure HttpOnly cookie.
    """
    if token:
        try:
            current_user = get_current_user(db=db, token=token)
            record_audit(
                db=db,
                action="AUTH_LOGOUT",
                resource_type="USER",
                actor_id=current_user.id,
                actor_email=current_user.email,
                actor_role=current_user.role,
                resource_id=current_user.id,
                metadata_json={"ip": request.client.host if request.client else "unknown"},
            )
        except Exception:
            pass

    # Clear cookie
    response.delete_cookie(
        key=settings.COOKIE_NAME,
        path="/",
    )
    return LogoutResponse(message="Successfully logged out of IASYN AI")


@router.get("/me", response_model=CurrentUserResponse)
def get_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns authenticated user profile information and clinical metadata.
    """
    display_name = current_user.email.split("@")[0].capitalize()
    profile_data = {}

    if current_user.role.upper() == "PATIENT":
        patient = db.query(PatientProfile).filter(PatientProfile.user_id == current_user.id).first()
        if patient:
            display_name = patient.display_name
            profile_data = {
                "profile_id": patient.id,
                "medical_id": patient.medical_id,
                "phone": patient.phone,
                "demographics": patient.demographics,
                "rehab_goals": patient.rehab_goals,
                "consent_status": patient.consent_status,
                "baseline_rom": patient.baseline_rom,
                "contraindications": patient.contraindications,
            }
    elif current_user.role.upper() == "DOCTOR":
        doctor = db.query(DoctorProfile).filter(DoctorProfile.user_id == current_user.id).first()
        if doctor:
            display_name = doctor.display_name
            profile_data = {
                "profile_id": doctor.id,
                "license_number": doctor.license_number,
                "specialty": doctor.specialty,
                "department": doctor.department,
                "verification_status": doctor.verification_status,
            }
    elif current_user.role.upper() == "ADMIN":
        display_name = "Clinical Administrator"
        profile_data = {
            "department": "Platform & Clinical Governance",
            "access_tier": "SUPER_ADMIN",
        }

    return CurrentUserResponse(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role.upper(),
        is_active=current_user.is_active,
        display_name=display_name,
        profile=profile_data,
    )
