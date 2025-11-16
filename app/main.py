from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.routers import car, auth, dev
from sqlalchemy.orm import Session
from db.session import engine
from db.base import Base

app = FastAPI(title='by_car_api')

app.mount("/images", StaticFiles(directory="../images"), name="images")

Base.metadata.create_all(bind=engine)

app.include_router(car.router)
app.include_router(auth.router)
app.include_router(dev.router)