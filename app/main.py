from fastapi import FastAPI
from api.routers import car, auth
from sqlalchemy.orm import Session
from db import SessionLocal, Base, engine

app = FastAPI(title='by_car_api')

Base.metadata.create_all(bind=engine)

app.include_router(car.router)
app.include_router(auth.router)