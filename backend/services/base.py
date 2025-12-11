from models.models import *
from models.database import async_session_maker
import sqlalchemy as db


async def query_all_tournaments():
    async with async_session_maker() as session:
        query_select = db.select(Tournament)
        result = await session.execute(query_select)
        tour_data = result.scalars().fetchall()
        return tour_data
    
async def command_add_participant(tour_id: int, user_id: int):
    async with async_session_maker() as session:
        return
    
async def get_user_info(user_id: int):
    async with async_session_maker() as session:
        return