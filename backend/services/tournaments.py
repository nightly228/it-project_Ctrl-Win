from datetime import datetime, timedelta
from sqlalchemy import select, and_
from models.models import Tournament, Signup
from models.database import async_session_maker
from schemas import *
from utils import *


async def query_get_all_tournaments(status: str = None):
    async with async_session_maker() as session:
        query_select = select(Tournament)
        if status:
            query_select = query_select.where(Tournament.status == status)
        result = await session.execute(query_select)
        user_data = result.scalars().all()
        return user_data


async def command_create_tournament(data: CreateTournamentRequest, email: str):
    async with async_session_maker() as session:
        new_tournament = Tournament(
            name=data.name,
            organiser_email=email,
            game=data.game,
            status="upcoming",
            max_players=data.max_players,
            start_time=data.start_time
        )
        session.add(new_tournament)
        await session.commit()


async def command_add_participant(email: str, tournament_id: int):
    async with async_session_maker() as session:
        new_signup = Signup(
            tournament_id=tournament_id,
            user_email=email,
            status="confirmed"
        )
        session.add(new_signup)
        await session.commit()
