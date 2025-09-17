from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...db.session import get_db
from ...schemas.event import EventCreate, EventUpdate, EventOut
from ...services.events import list_events, get_event, create_event, update_event, delete_event
from ..deps import require_admin


router = APIRouter(dependencies=[Depends(require_admin)])


@router.get("/", response_model=list[EventOut])
def admin_list_events(db: Session = Depends(get_db)):
    return list_events(db)


@router.post("/", response_model=EventOut, status_code=status.HTTP_201_CREATED)
def admin_create_event(payload: EventCreate, db: Session = Depends(get_db)):
    return create_event(db, payload)


@router.put("/{event_id}", response_model=EventOut)
def admin_update_event(event_id: int, payload: EventUpdate, db: Session = Depends(get_db)):
    event = get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return update_event(db, event, payload)


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_event(event_id: int, db: Session = Depends(get_db)):
    event = get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    delete_event(db, event)
    return None








