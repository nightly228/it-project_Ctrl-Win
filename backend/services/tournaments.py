# backend/services/tournaments.py

from datetime import datetime, timedelta
from sqlalchemy import select, and_, func
from models.models import Tournament, Signup, User
from models.database import async_session_maker
from schemas import CreateTournamentRequest
from fastapi import HTTPException

async def query_get_all_tournaments(status: str = None):
    async with async_session_maker() as session:
        # Используем join или подзапрос, если захотим считать участников, 
        # но пока просто берем все поля модели Tournament
        query_select = select(Tournament)
        if status:
            query_select = query_select.where(Tournament.status == status)
        
        result = await session.execute(query_select)
        return result.scalars().all()
    

async def query_get_tournament_by_id(tournament_id: int):
    async with async_session_maker() as session:
        # 1. Получаем данные самого турнира
        query = select(Tournament).where(Tournament.id == tournament_id)
        result = await session.execute(query)
        tournament = result.scalars().first()
        
        if not tournament:
            return None
            
        # 2. Считаем количество подтвержденных регистраций
        count_query = select(func.count(Signup.id)).where(
            Signup.tournament_id == tournament_id,
            Signup.status == 'confirmed'
        )
        count_res = await session.execute(count_query)
        current_players = count_res.scalar()
        
        # Конвертируем в словарь для API и добавляем счетчик
        tournament_dict = {
            "id": tournament.id,
            "name": tournament.name,
            "game": tournament.game,
            "match_type": tournament.match_type,
            "bracket_type": tournament.bracket_type,
            "status": tournament.status,
            "max_players": tournament.max_players,
            "current_players": current_players, # Наше вычисляемое поле
            "start_time": tournament.start_time,
            "prize_pool": float(tournament.prize_pool),
            "entry_fee": float(tournament.entry_fee),
            "sponsor_revenue": float(tournament.sponsor_revenue)
        }
        
        return tournament_dict


async def command_create_tournament(data: CreateTournamentRequest, email: str):
    async with async_session_maker() as session:
        # Создаем объект модели, распаковывая данные из схемы
        new_tournament = Tournament(
            name=data.name,
            organiser_email=email,
            game=data.game,
            match_type=data.match_type,
            bracket_type=data.bracket_type,
            status="upcoming",
            max_players=data.max_players,
            start_time=data.start_time,
            # Финансы
            prize_pool=data.prize_pool,
            entry_fee=data.entry_fee,
            sponsor_revenue=data.sponsor_revenue
        )
        
        session.add(new_tournament)
        await session.commit()
        await session.refresh(new_tournament)
        return new_tournament


async def command_add_participant(email: str, tournament_id: int):
    async with async_session_maker() as session:
        # 1. Проверяем, существует ли турнир и есть ли места
        query = select(Tournament).where(Tournament.id == tournament_id)
        result = await session.execute(query)
        tournament = result.scalar_one_or_none()
        
        if not tournament:
            raise HTTPException(status_code=404, detail="Турнир не найден")

        # 2. Считаем текущее кол-во подтвержденных участников
        count_query = select(func.count(Signup.id)).where(Signup.tournament_id == tournament_id)
        count_result = await session.execute(count_query)
        current_count = count_result.scalar()

        if tournament.max_players and current_count >= tournament.max_players:
            raise HTTPException(status_code=400, detail="Турнир уже заполнен")

        # 3. Проверяем, не зарегистрирован ли пользователь уже (для предотвращения дублей)
        check_query = select(Signup).where(
            and_(Signup.tournament_id == tournament_id, Signup.user_email == email)
        )
        existing = await session.execute(check_query)
        if existing.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Вы уже зарегистрированы")

        # 4. Регистрация
        new_signup = Signup(
            tournament_id=tournament_id,
            user_email=email,
            status="confirmed" # По умолчанию сразу подтверждаем
        )
        
        session.add(new_signup)
        await session.commit()
        return {"status": "success", "message": "Регистрация завершена"}
    

# services/statistics.py
async def get_platform_stats():
    async with async_session_maker() as session:
        last_month_start = datetime.now() - timedelta(days=30)

        # Выполняем запросы
        total_t = (await session.execute(select(func.count(Tournament.id)))).scalar()
        total_p = (await session.execute(select(func.count(Signup.id)))).scalar()
        month_t = (await session.execute(select(func.count(Tournament.id)).where(Tournament.created_at >= last_month_start))).scalar()
        month_p = (await session.execute(select(func.count(Signup.id)).join(Tournament).where(Tournament.created_at >= last_month_start))).scalar()

        return {
            "all_time": {
                "tournaments": int(total_t or 0),
                "participants": int(total_p or 0)
            },
            "last_month": {
                "tournaments": int(month_t or 0),
                "participants": int(month_p or 0)
            }
        }