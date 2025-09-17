from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...db.session import get_db
from ...schemas.event import EventOut
from ...services.events import list_events, get_event


router = APIRouter()


@router.get("/", response_model=list[EventOut])
def get_events(db: Session = Depends(get_db)):
    return list_events(db)


@router.get("/{event_id}", response_model=EventOut)
def get_event_detail(event_id: int, db: Session = Depends(get_db)):
    event = get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event








