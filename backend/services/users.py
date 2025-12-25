# backend/services/users.py

from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, func, and_
from sqlalchemy.orm import aliased
from fastapi import HTTPException, status
from models.models import User, Tournament, Signup
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


async def get_user_info(email: str):
    async with async_session_maker() as session:
        # 1. Запрос основной информации пользователя
        user_query = select(User).where(User.email == email)
        user_result = await session.execute(user_query)
        user = user_result.scalars().first()

        if not user:
            raise HTTPException(status_code=404, detail="Пользователь не найден")

        # 2. Статистика Организатора
        # Считаем: кол-во турниров, общую выручку (спонсоры + взносы участников)
        # Для этого джойним турниры с регистрациями
        org_query = select(
            func.count(Tournament.id.distinct()).label("total_organized"),
            func.sum(Tournament.sponsor_revenue).label("total_sponsor_money"),
            # Сумма всех взносов: количество подтвержденных участников * взнос турнира
            func.sum(Tournament.entry_fee).label("total_entry_fees") 
        ).outerjoin(Signup, Signup.tournament_id == Tournament.id)\
         .where(Tournament.organiser_email == email)
        
        org_res = await session.execute(org_query)
        org_stats = org_res.first()

        # 3. Статистика Участника
        # Считаем: кол-во участий и среднее место
        part_query = select(
            func.count(Signup.id).label("total_participated"),
            func.avg(Signup.final_place).label("avg_place")
        ).where(Signup.user_email == email)
        
        part_res = await session.execute(part_query)
        part_stats = part_res.first()

        # 4. Подготовка данных для фронтенда
        total_org = org_stats.total_organized or 0
        total_part = part_stats.total_participated or 0
        
        # Расчет прибыли организатора
        sponsor_money = float(org_stats.total_sponsor_money or 0)
        entry_money = float(org_stats.total_entry_fees or 0)
        total_revenue = sponsor_money + entry_money

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.created_at,
            "is_admin": user.is_admin,
            
            # Статистика для бейджей и LVL
            "total_organized": total_org,
            "total_participated": total_part,
            "totalTournaments": total_org + total_part,
            
            # Финансовая статистика
            "revenue": total_revenue,
            "avg_place": round(float(part_stats.avg_place or 0), 1),
            
            # Доп. поля (можно расширить из таблицы User)
            "role": "Организатор" if total_org > total_part else "Игрок",
            "level": int((total_org + total_part)**0.5) or 1
        }