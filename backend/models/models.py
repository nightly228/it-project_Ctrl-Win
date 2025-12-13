from sqlalchemy.orm import declarative_base
from sqlalchemy import *
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    email = Column(String(), unique=True, nullable=False)
    name = Column(String(), nullable=False)
    password_hash = Column(LargeBinary())
    is_admin = Column(Boolean(), default=False)

class Tournament(Base):
    __tablename__ = "tournaments"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    name = Column(String(), nullable=False)
    game = Column(String())  # CS2, Dota 2, Valorant и т.д.
    status = Column(String(), default="upcoming")  # upcoming, registration, ongoing, completed
    max_players = Column(Integer())
    start_time = Column(DateTime())

class Signup(Base):
    __tablename__ = "signups"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    tournament_id = Column(ForeignKey("tournaments.id"), nullable=False)
    user_email = Column(ForeignKey("users.email"), nullable=False)
    status = Column(String(), default="pending")  # pending, confirmed, checked_in
    
    # Уникальная пара: пользователь может регистрироваться на турнир только один раз
    __table_args__ = (
        UniqueConstraint('tournament_id', 'user_email', name='uq_tournament_user'),
    )

class Match(Base):
    __tablename__ = "matches"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    tournament_id = Column(ForeignKey("tournaments.id"), nullable=False)
    round = Column(Integer())  # Номер раунда
    player1_id = Column(ForeignKey("users.id"), nullable=False)
    player2_id = Column(ForeignKey("users.id"), nullable=True)  # Может быть None для нечетных участников
    winner_id = Column(ForeignKey("users.id"), nullable=True)  # Победитель
    status = Column(String(), default="scheduled")  # scheduled, ongoing, completed