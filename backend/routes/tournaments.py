from fastapi import APIRouter, HTTPException, Header
from schemas import *
from services.tournaments import *
from utils import *


router = APIRouter(prefix="/tournaments")

# incoming tournaments
@router.get("/")
async def get_all_tournaments():
    tourlist = await query_get_all_tournaments()
    return {"tournaments": tourlist}


@router.post("/create")
async def get_all_tournaments(data: CreateTournamentRequest):
    await command_create_tournament(data=data)
    return {"status": "ok"}


# sign to a tournament
@router.post("/{tournament_id}/sign")
async def join_the_tournament(tournament_id: int, authorization: str = Header(...)):

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    payload = verify_jwt_token(token=authorization.split()[1])
    email = payload["sub"]

    await command_add_participant(email=email, tournament_id=tournament_id)

    return {"status": "ok"}