from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from typing import List
import asyncio
import schemas
import services.base as services

router = APIRouter(prefix="/api/v1", tags=["tournaments"])


@router.get("/tournaments/upcoming", response_model=List[schemas.Tournament])
async def get_upcoming_tournaments(days: int = Query(14, ge=1, le=60)):
    """
    Получить ближайшие турниры
    """
    try:
        tournaments = await services.get_upcoming_tournaments(days)
        return tournaments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tournaments/{tournament_id}/register/{user_id}")
async def register_for_tournament(tournament_id: int, user_id: int):
    """
    Зарегистрировать пользователя на турнир
    """
    try:
        signup = await services.command_add_participant(tournament_id, user_id)
        return {
            "message": "Успешная регистрация",
            "signup_id": signup.id,
            "status": signup.status
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/users/{user_id}")
async def get_user_info(user_id: int):
    """
    Получить информацию о пользователе
    """
    user = await services.get_user_info(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user


@router.get("/tournaments/{tournament_id}/participants")
async def get_tournament_participants(tournament_id: int):
    """
    Получить участников турнира
    """
    participants = await services.get_tournament_participants(tournament_id)
    return {
        "count": len(participants),
        "participants": [
            {
                "user_id": user.id,
                "user_name": user.name,
                "signup_id": signup.id,
                "signup_status": signup.status
            }
            for user, signup in participants
        ]
    }
