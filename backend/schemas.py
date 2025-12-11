from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

# Минимальные схемы для MVP
class UserBase(BaseModel):
    name: str
    is_admin: bool = False

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class TournamentBase(BaseModel):
    name: str
    game: str
    max_players: Optional[int] = None
    start_time: datetime

class TournamentCreate(TournamentBase):
    status: str = "upcoming"

class Tournament(TournamentBase):
    id: int
    status: str
    model_config = ConfigDict(from_attributes=True)

class SignupBase(BaseModel):
    tournament_id: int
    user_id: int

class SignupCreate(SignupBase):
    status: str = "pending"

class Signup(SignupBase):
    id: int
    status: str
    model_config = ConfigDict(from_attributes=True)

# Схемы для роутов
class UpcomingTournamentsResponse(BaseModel):
    tournaments: list[Tournament]
    count: int

class RegisterResponse(BaseModel):
    success: bool
    message: str
    signup_id: Optional[int] = None