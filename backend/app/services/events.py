from sqlalchemy.orm import Session
from sqlalchemy import select
from ..models.event import Event
from ..schemas.event import EventCreate, EventUpdate


def list_events(db: Session) -> list[Event]:
    return list(db.execute(select(Event).order_by(Event.date, Event.time)).scalars())


def get_event(db: Session, event_id: int) -> Event | None:
    return db.get(Event, event_id)


def create_event(db: Session, data: EventCreate) -> Event:
    event = Event(**data.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def update_event(db: Session, event: Event, data: EventUpdate) -> Event:
    for field, value in data.dict(exclude_unset=True).items():
        setattr(event, field, value)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def delete_event(db: Session, event: Event) -> None:
    db.delete(event)
    db.commit()








