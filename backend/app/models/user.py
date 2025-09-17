from sqlalchemy import Column, Integer, String, Enum
from ..db.base import Base
import enum


class UserRole(str, enum.Enum):
    admin = "admin"
    normal = "normal"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.normal)








