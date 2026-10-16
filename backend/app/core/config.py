from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "IASYN AI Clinical Backend"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Security
    SECRET_KEY: str = "iasyn-ai-dev-clinical-secret-key-change-in-production-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480  # 8 hours for clinical shifts
    COOKIE_NAME: str = "iasyn_access_token"

    # Database: SQLite for local development, PostgreSQL ready
    DATABASE_URL: str = "sqlite:///./iasyn_dev.db"

    # CORS
    BACKEND_CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    # Demo Seed Accounts
    SEED_PATIENT_EMAIL: str = "patient.demo@iasyn.ai"
    SEED_DOCTOR_EMAIL: str = "doctor.demo@iasyn.ai"
    SEED_ADMIN_EMAIL: str = "admin.demo@iasyn.ai"
    SEED_DEFAULT_PASSWORD: str = "ClinicalPass2026!"

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
