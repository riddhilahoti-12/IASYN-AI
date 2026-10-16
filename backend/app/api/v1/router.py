from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.patients import router as patients_router
from app.api.v1.doctors import router as doctors_router
from app.api.v1.therapy_plans import router as therapy_plans_router
from app.api.v1.sessions import router as sessions_router
from app.api.v1.admin import router as admin_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(patients_router)
api_router.include_router(doctors_router)
api_router.include_router(therapy_plans_router)
api_router.include_router(sessions_router)
api_router.include_router(admin_router)
