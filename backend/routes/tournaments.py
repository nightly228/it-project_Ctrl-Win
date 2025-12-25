# backend/routes/tournaments.py

from fastapi import APIRouter, HTTPException, Header, Depends
from typing import List
from schemas import CreateTournamentRequest, TournamentResponse
from services.tournaments import (
    query_get_all_tournaments, 
    command_create_tournament, 
    command_add_participant
)
from utils import verify_jwt_token

router = APIRouter(prefix="/tournaments", tags=["Tournaments"])

# Получение списка турниров
@router.get("/")
async def get_tournaments(status: str = None):
    tourlist = await query_get_all_tournaments(status=status)
    return {"tournaments": tourlist}


# Создание турнира
@router.post("/create")
async def create_tournament_endpoint(
    data: CreateTournamentRequest, 
    authorization: str = Header(...)
):
    # 1. Валидация токена
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split()[1]
    payload = verify_jwt_token(token=token)
    email = payload["sub"]

    # 2. Вызов команды (теперь возвращаем созданный турнир)
    tournament = await command_create_tournament(data=data, email=email)
    
    return {
        "status": "ok", 
        "tournament_id": tournament.id,
        "message": "Турнир успешно создан"
    }


# Регистрация участника на турнир
@router.post("/{tournament_id}/sign")
async def join_the_tournament(
    tournament_id: int, 
    authorization: str = Header(...)
):
    # 1. Валидация токена
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split()[1]
    payload = verify_jwt_token(token=token)
    email = payload["sub"]

    # 2. Логика добавления (внутри сервиса уже есть проверки на лимит игроков и дубли)
    await command_add_participant(email=email, tournament_id=tournament_id)

    return {"status": "ok", "message": "Вы успешно зарегистрированы"}