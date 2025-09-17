from pydantic_settings import BaseSettings
from pydantic import AnyUrl
from typing import List
import os


class Settings(BaseSettings):
    database_url: AnyUrl | str = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "change-me-in-prod")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    cors_allow_origins: List[str] = [
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
        os.getenv("FRONTEND_URL_ALT", "http://127.0.0.1:3000"),
    ]

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()



