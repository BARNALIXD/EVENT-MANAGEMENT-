from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...db.session import get_db
from ...schemas.auth import SignupRequest, LoginRequest, TokenResponse
from ...models.user import UserRole
from ...services.users import create_user, authenticate_user, get_user_by_email
from ...services.security import create_access_token


router = APIRouter()


@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, name=payload.name, email=payload.email, password=payload.password, role=UserRole.normal)
    token = create_access_token(subject=user.email, role=user.role.value)
    return TokenResponse(access_token=token, role=user.role.value)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token(subject=user.email, role=user.role.value)
    return TokenResponse(access_token=token, role=user.role.value)








