## Event Management API (FastAPI)

### Setup
1. Create and activate venv (Windows):
```bash
python -m venv .venv
.venv\\Scripts\\activate
```
2. Install deps:
```bash
pip install -r requirements.txt
```
3. Configure environment:
```bash
copy .env.example .env
# edit .env to set DATABASE_URL and secrets
```
4. Run migrations:
```bash
alembic upgrade head
```
5. Run server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Routes
- Auth: `/auth/signup`, `/auth/login`
- Public Events: `/events/`, `/events/{id}`
- Admin Events: `/admin/events/` CRUD (Bearer token with role=admin)








