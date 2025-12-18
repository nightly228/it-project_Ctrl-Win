from fastapi import HTTPException, APIRouter, Header
from services.base import *
from utils import *
from schemas import *
import services.users as services

router = APIRouter(prefix='/users')


@router.post("/register")
async def register(data: RegisterRequest):
    print(f"[[{dict(data)}]]")
    jwt_token = await services.register_user(data)
    return {"message": "Registration successful", "token": jwt_token}


@router.post("/login")
async def login(data: LoginRequest):
    print(f"[[{dict(data)}]]")
    jwt_token = await services.login_check(data)
    if jwt_token:
        return {"message": "Login successful", "token": jwt_token}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
@router.get("/me")
async def get_user_info(authorization: str = Header(...)):
    """
    Получить информацию о пользователе
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    payload = verify_jwt_token(token=authorization.split()[1])
    user = await services.get_user_info(payload["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user