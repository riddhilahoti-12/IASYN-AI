from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    email: str
    role: str
    is_active: bool = True


class UserCreate(UserBase):
    password: str
    display_name: str


class UserStatusUpdate(BaseModel):
    is_active: bool


class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
