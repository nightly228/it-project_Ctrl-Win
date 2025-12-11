from fastapi import APIRouter, HTTPException, status, Query
from services.base import *

router = APIRouter()


@router.get("/health", status_code=status.HTTP_200_OK)
async def get_health():
    return {"health": "ok"}

@router.get("/tournaments")
async def get_tournaments():
    return {"health": "ok"}

@router.post("/signup")
async def get_tournaments():
    return {"health": "ok"}

@router.get("/me")
async def get_user_info():
    return {"health": "ok"}