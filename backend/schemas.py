from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import Optional, List

# --- ОБЩИЕ СХЕМЫ (AUTH) ---

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr # EmailStr автоматически проверит формат почты
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# --- ТУРНИРЫ ---

class CreateTournamentRequest(BaseModel):
    name: str
    game: str
    match_type: str = "1v1"  # "1v1", "3v3", "5v5"
    max_players: int
    start_time: datetime
    bracket_type: Optional[str] = "single_elimination"

class TournamentResponse(BaseModel):
    id: int
    name: str
    game: str
    match_type: str
    status: str
    max_players: int
    start_time: datetime
    organiser_email: str
    
    # Позволяет Pydantic читать данные прямо из моделей SQLAlchemy
    model_config = ConfigDict(from_attributes=True)

# --- РЕГИСТРАЦИИ (SIGNUPS) ---

class SignupResponse(BaseModel):
    id: int
    tournament_id: int
    user_email: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- МАТЧИ (MATCHES) ---

class MatchResponse(BaseModel):
    id: int
    tournament_id: int
    round: int
    player1_id: int
    player2_id: Optional[int] = None
    winner_id: Optional[int] = None
    status: str
    next_match_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)

# --- РАСШИРЕННЫЕ СХЕМЫ (Для фронтенда) ---

class TournamentDetailResponse(TournamentResponse):
    """Возвращает турнир вместе со списком участников и матчей"""
    participants: List[SignupResponse] = []
    matches: List[MatchResponse] = []