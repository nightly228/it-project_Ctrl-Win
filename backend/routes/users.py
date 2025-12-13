from fastapi import HTTPException, APIRouter, Header
from services.base import *
from utils import *
from schemas import *
from services.users import *

router = APIRouter(prefix='/users')


@router.post("/register")
async def register(data: RegisterRequest):
    jwt_token = await register_user(data)
    return {"message": "Registration successful", "token": jwt_token}


@router.post("/login")
async def login(data: LoginRequest):
    jwt_token = await login_check(data)
    if jwt_token:
        return {"message": "Login successful", "token": jwt_token}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
@router.get("/{user_id}")
async def get_user_info(user_id: int):
    """
    Получить информацию о пользователе
    """
    user = await get_user_info(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user