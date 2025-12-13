from datetime import datetime, timedelta
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from models.models import User, Tournament, Signup
from models.database import async_session_maker
from schemas import *
from utils import *

async def register_user(data: RegisterRequest) -> str:
    """
    INSERT INTO users ($email, $passwordhash, $name)
    """
    passwordhash = create_password_hash(password=data.password)
    async with async_session_maker() as session:
        new_user = User(
            email=data.email,
            password_hash=passwordhash,
            name=data.name
        )
        session.add(new_user)
        await session.commit()
    jwttoken = create_jwt_token(email=data.email)
    return jwttoken


async def get_password_hash(email: str) -> bytes:
    """
    SELECT passwordhash FROM users WHERE email == $email
    """
    async with async_session_maker() as session:
        query_select = select(User).where(User.email == email)
        result = await session.execute(query_select)
        user_data = result.scalars().first()
        return user_data.password_hash


async def login_check(data: LoginRequest) -> str:
    passwordhash = await get_password_hash(email=data.email)
    if not passwordhash:
        return False
    success = is_password_correct(data.password, passwordhash)
    if success:
        jwttoken = create_jwt_token(email=data.email)
        return jwttoken
    else:
        return False
    

async def get_user_info(email: str) -> User:
    """
    SELECT * FROM users WHERE email = $email
    """
    async with async_session_maker() as session:
        query_select = select(User).where(User.email == email)
        result = await session.execute(query_select)
        user_data = result.scalars().first()
        return user_data