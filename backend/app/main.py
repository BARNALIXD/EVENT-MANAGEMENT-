from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .api.routes import auth as auth_routes
from .api.routes import events as events_routes
from .api.routes import admin_events as admin_events_routes
from .db.base import Base
from .db.session import engine


def create_app() -> FastAPI:
    app = FastAPI(title="Event Management API", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_allow_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
    app.include_router(events_routes.router, prefix="/events", tags=["events"])
    app.include_router(admin_events_routes.router, prefix="/admin/events", tags=["admin-events"])

    @app.get("/healthz")
    def healthcheck() -> dict:
        return {"status": "ok"}

    @app.on_event("startup")
    def on_startup() -> None:
        # Ensure tables exist (useful for SQLite demo without Alembic)
        Base.metadata.create_all(bind=engine)

    return app


app = create_app()



