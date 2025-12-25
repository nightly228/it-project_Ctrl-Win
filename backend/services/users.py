# backend/services/users.py

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from models.models import User, Tournament
from models.database import async_session_maker
from schemas import RegisterRequest, LoginRequest
from utils import create_password_hash, create_jwt_token, is_password_correct

async def register_user(data: RegisterRequest) -> str:
    passwordhash = create_password_hash(password=data.password)
    async with async_session_maker() as session:
        try:
            new_user = User(
                email=data.email,
                password_hash=passwordhash,
                name=data.name
            )
            session.add(new_user)
            await session.commit()
        except IntegrityError:
            # Если email уже существует
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь с таким email уже зарегистрирован"
            )
            
    return create_jwt_token(email=data.email)

async def login_check(data: LoginRequest) -> str:
    async with async_session_maker() as session:
        query = select(User).where(User.email == data.email)
        result = await session.execute(query)
        user = result.scalars().first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Неверный email или пароль"
            )
        
        if is_password_correct(data.password, user.password_hash):
            return create_jwt_token(email=user.email)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Неверный email или пароль"
            )

async def get_user_info(email: str) -> User:
    async with async_session_maker() as session:
        # Используем selectinload для загрузки связанных турниров, 
        # если они понадобятся в схеме ответа
        query = select(User).where(User.email == email)
        result = await session.execute(query)
        user_data = result.scalars().first()
        
        if not user_data:
            raise HTTPException(status_code=404, detail="Пользователь не найден")
            
        return user_data