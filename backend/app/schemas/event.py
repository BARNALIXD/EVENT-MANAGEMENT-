from pydantic import BaseModel, HttpUrl, constr
from datetime import date, time, datetime
from typing import Optional


class EventBase(BaseModel):
    title: constr(strip_whitespace=True, min_length=1)
    description: Optional[str] = None
    date: date
    time: time
    image_url: Optional[HttpUrl] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[constr(strip_whitespace=True, min_length=1)] = None
    description: Optional[str] = None
    date: Optional[date] = None
    time: Optional[time] = None
    image_url: Optional[HttpUrl] = None


class EventOut(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True








