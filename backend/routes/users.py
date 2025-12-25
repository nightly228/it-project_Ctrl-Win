# backend/routes/users.py

from fastapi import HTTPException, APIRouter, Header, status
from services.base import *
from utils import *
from schemas import RegisterRequest, LoginRequest # Добавили схему ответа
import services.users as services


router = APIRouter(prefix='/users', tags=["Users"])


@router.post("/register")
async def register(data: RegisterRequest):
    # Убираем пароль из логов в продакшене, оставляем только email для дебага
    print(f"Registering user: {data.email}")
    jwt_token = await services.register_user(data)
    return {"message": "Registration successful", "token": jwt_token}


@router.post("/login")
async def login(data: LoginRequest):
    print(f"Login attempt: {data.email}")
    jwt_token = await services.login_check(data)
    
    # Логика HTTPException уже есть внутри сервиса (из прошлого шага), 
    # но оставляем проверку здесь для подстраховки
    if jwt_token:
        return {"message": "Login successful", "token": jwt_token}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail="Invalid email or password"
    )


@router.get("/me") # Здесь можно добавить response_model=UserResponse
async def get_current_user_info(authorization: str = Header(...)):
    """
    Получить информацию о текущем пользователе по JWT токену
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid authorization header"
        )
    
    # 1. Извлекаем токен
    token = authorization.split()[1]
    
    # 2. Проверяем валидность токена
    payload = verify_jwt_token(token=token)
    
    # 3. Получаем данные (payload['sub'] содержит email)
    user = await services.get_user_info(payload["sub"])
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Пользователь не найден"
        )
        
    return user