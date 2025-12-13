from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class CreateTournamentRequest(BaseModel):
    name: str
    game: str
    max_players: int
    start_time: datetime