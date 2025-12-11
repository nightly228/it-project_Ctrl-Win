from datetime import datetime, timedelta
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from models.models import User, Tournament, Signup
from models.database import async_session_maker


async def query_all_tournaments() -> list[Tournament]:
    """
    Получить все турниры
    """
    async with async_session_maker() as session:
        query = select(Tournament).order_by(Tournament.start_time.asc())
        result = await session.execute(query)
        tour_data = result.scalars().all()
        return tour_data


async def get_upcoming_tournaments(days: int = 14) -> list[Tournament]:
    """
    Получить турниры на ближайшие N дней
    """
    async with async_session_maker() as session:
        today = datetime.now()
        future_date = today + timedelta(days=days)
        
        query = select(Tournament).where(
            and_(
                Tournament.start_time >= today,
                Tournament.start_time <= future_date,
                Tournament.status.in_(["upcoming", "registration"])
            )
        ).order_by(Tournament.start_time.asc())
        
        result = await session.execute(query)
        tournaments = result.scalars().all()
        return tournaments


async def get_tournament_by_id(tournament_id: int) -> Tournament | None:
    """
    Получить турнир по ID
    """
    async with async_session_maker() as session:
        query = select(Tournament).where(Tournament.id == tournament_id)
        result = await session.execute(query)
        tournament = result.scalar_one_or_none()
        return tournament


async def command_add_participant(tour_id: int, user_id: int) -> Signup:
    """
    Зарегистрировать участника на турнир
    """
    async with async_session_maker() as session:
        # Проверяем существование турнира
        tournament_query = select(Tournament).where(Tournament.id == tour_id)
        tournament_result = await session.execute(tournament_query)
        tournament = tournament_result.scalar_one_or_none()
        
        if not tournament:
            raise ValueError(f"Турнир с ID {tour_id} не найден")
        
        # Проверяем существование пользователя
        user_query = select(User).where(User.id == user_id)
        user_result = await session.execute(user_query)
        user = user_result.scalar_one_or_none()
        
        if not user:
            raise ValueError(f"Пользователь с ID {user_id} не найден")
        
        # Проверяем, не зарегистрирован ли уже
        existing_signup_query = select(Signup).where(
            and_(
                Signup.tournament_id == tour_id,
                Signup.user_id == user_id
            )
        )
        existing_result = await session.execute(existing_signup_query)
        existing_signup = existing_result.scalar_one_or_none()
        
        if existing_signup:
            raise ValueError(f"Пользователь {user_id} уже зарегистрирован на турнир {tour_id}")
        
        # Проверяем максимальное количество участников
        if tournament.max_players:
            count_query = select(Signup).where(Signup.tournament_id == tour_id)
            count_result = await session.execute(count_query)
            current_count = len(count_result.scalars().all())
            
            if current_count >= tournament.max_players:
                raise ValueError(f"Турнир {tour_id} уже заполнен (максимум {tournament.max_players} участников)")
        
        # Проверяем, не начался ли уже турнир
        if tournament.start_time < datetime.now():
            raise ValueError(f"Турнир {tour_id} уже начался")
        
        # Проверяем статус турнира
        if tournament.status not in ["upcoming", "registration"]:
            raise ValueError(f"Турнир {tour_id} не принимает регистрации (статус: {tournament.status})")
        
        # Создаем регистрацию
        new_signup = Signup(
            tournament_id=tour_id,
            user_id=user_id,
            status="pending"
        )
        
        session.add(new_signup)
        await session.commit()
        await session.refresh(new_signup)
        
        return new_signup


async def get_user_info(user_id: int) -> User | None:
    """
    Получить информацию о пользователе
    """
    async with async_session_maker() as session:
        # Базовый запрос пользователя
        query = select(User).where(User.id == user_id)
        result = await session.execute(query)
        user = result.scalar_one_or_none()
        return user


async def get_user_with_signups(user_id: int) -> tuple[User | None, list[Signup]]:
    """
    Получить пользователя и его регистрации на турниры
    """
    async with async_session_maker() as session:
        # Получаем пользователя с его регистрациями
        query = select(User).where(User.id == user_id).options(
            selectinload(User.signups)
        )
        result = await session.execute(query)
        user = result.scalar_one_or_none()
        
        if not user:
            return None, []
        
        return user, user.signups


async def get_tournament_participants(tournament_id: int) -> list[tuple[User, Signup]]:
    """
    Получить всех участников турнира с их данными регистрации
    """
    async with async_session_maker() as session:
        # Используем join для получения пользователей и их регистраций
        query = select(User, Signup).join(
            Signup, User.id == Signup.user_id
        ).where(
            Signup.tournament_id == tournament_id
        )
        
        result = await session.execute(query)
        participants = result.all()
        
        # Преобразуем результат в список кортежей (User, Signup)
        return [(user, signup) for user, signup in participants]


async def create_user(name: str, is_admin: bool = False) -> User:
    """
    Создать нового пользователя
    """
    async with async_session_maker() as session:
        new_user = User(
            name=name,
            is_admin=is_admin
        )
        
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        
        return new_user


async def create_tournament(
    name: str, 
    game: str, 
    start_time: datetime,
    max_players: int | None = None,
    status: str = "upcoming"
) -> Tournament:
    """
    Создать новый турнир
    """
    async with async_session_maker() as session:
        new_tournament = Tournament(
            name=name,
            game=game,
            start_time=start_time,
            max_players=max_players,
            status=status
        )
        
        session.add(new_tournament)
        await session.commit()
        await session.refresh(new_tournament)
        
        return new_tournament


async def update_tournament_status(tournament_id: int, new_status: str) -> Tournament | None:
    """
    Обновить статус турнира
    """
    async with async_session_maker() as session:
        # Получаем турнир
        query = select(Tournament).where(Tournament.id == tournament_id)
        result = await session.execute(query)
        tournament = result.scalar_one_or_none()
        
        if not tournament:
            return None
        
        # Обновляем статус
        tournament.status = new_status
        await session.commit()
        await session.refresh(tournament)
        
        return tournament


async def cancel_signup(tournament_id: int, user_id: int) -> bool:
    """
    Отменить регистрацию на турнир
    """
    async with async_session_maker() as session:
        # Ищем регистрацию
        query = select(Signup).where(
            and_(
                Signup.tournament_id == tournament_id,
                Signup.user_id == user_id
            )
        )
        result = await session.execute(query)
        signup = result.scalar_one_or_none()
        
        if not signup:
            return False
        
        # Удаляем регистрацию
        await session.delete(signup)
        await session.commit()
        
        return True


async def get_tournament_statistics(tournament_id: int) -> dict:
    """
    Получить статистику по турниру
    """
    async with async_session_maker() as session:
        # Получаем турнир
        tournament_query = select(Tournament).where(Tournament.id == tournament_id)
        tournament_result = await session.execute(tournament_query)
        tournament = tournament_result.scalar_one_or_none()
        
        if not tournament:
            return {"error": "Турнир не найден"}
        
        # Считаем количество регистраций
        signups_query = select(Signup).where(Signup.tournament_id == tournament_id)
        signups_result = await session.execute(signups_query)
        signups_count = len(signups_result.scalars().all())
        
        # Получаем список участников
        participants_query = select(User).join(
            Signup, User.id == Signup.user_id
        ).where(Signup.tournament_id == tournament_id)
        
        participants_result = await session.execute(participants_query)
        participants = participants_result.scalars().all()
        
        return {
            "tournament_id": tournament_id,
            "tournament_name": tournament.name,
            "status": tournament.status,
            "start_time": tournament.start_time,
            "max_players": tournament.max_players,
            "registered_players": signups_count,
            "available_spots": tournament.max_players - signups_count if tournament.max_players else None,
            "participants": [{"id": p.id, "name": p.name} for p in participants],
            "is_full": tournament.max_players and signups_count >= tournament.max_players,
            "has_started": tournament.start_time < datetime.now()
        }