from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import *
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    email = Column(String(), unique=True, nullable=False, index=True)
    name = Column(String(), nullable=False)
    password_hash = Column(LargeBinary())
    is_admin = Column(Boolean(), default=False)
    created_at = Column(DateTime(), server_default=func.now()) # Правильно для БД

    # Связи (удобно для ORM: user.tournaments_created)
    tournaments_created = relationship("Tournament", back_populates="organiser")


class Tournament(Base):
    __tablename__ = "tournaments"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    organiser_email = Column(ForeignKey("users.email"), nullable=False)
    name = Column(String(), nullable=False)
    game = Column(String()) 
    match_type = Column(String()) # 1v1, 5v5
    bracket_type = Column(String(), default="single_elimination") # Добавил для Challonge логики
    status = Column(String(), default="upcoming") 
    max_players = Column(Integer())
    start_time = Column(DateTime())
    created_at = Column(DateTime(), server_default=func.now())
    
    # Для интеграции с внешними сервисами
    external_id = Column(String(), nullable=True) # ID из Challonge/Toornament

    organiser = relationship("User", back_populates="tournaments_created")
    matches = relationship("Match", back_populates="tournament")


class Signup(Base):
    __tablename__ = "signups"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    tournament_id = Column(ForeignKey("tournaments.id", ondelete="CASCADE"), nullable=False)
    user_email = Column(ForeignKey("users.email", ondelete="CASCADE"), nullable=False)
    status = Column(String(), default="pending") 
    created_at = Column(DateTime(), server_default=func.now())

    __table_args__ = (
        UniqueConstraint('tournament_id', 'user_email', name='uq_tournament_user'),
    )


class Match(Base):
    __tablename__ = "matches"
    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    tournament_id = Column(ForeignKey("tournaments.id", ondelete="CASCADE"), nullable=False)
    round = Column(Integer()) 
    
    # Сетка: связи для автоматизации продвижения по турниру
    next_match_id = Column(ForeignKey("matches.id"), nullable=True) # Ссылка на следующий матч в сетке
    
    player1_id = Column(ForeignKey("users.id"), nullable=False)
    player2_id = Column(ForeignKey("users.id"), nullable=True) 
    winner_id = Column(ForeignKey("users.id"), nullable=True)
    
    status = Column(String(), default="scheduled")
    start_time = Column(DateTime())

    tournament = relationship("Tournament", back_populates="matches")