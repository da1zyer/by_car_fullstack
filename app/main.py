from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api.routers import car, auth, dev
from sqlalchemy.orm import Session
from db.session import engine
from db.base import Base

app = FastAPI(title='by_car_api')

# Разрешённые источники
origins = [
    "http://localhost:5173",  # твой React dev сервер
    "http://127.0.0.1:5173",
    # Можно добавить другие домены
]

# Добавляем middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # какие источники разрешены
    allow_credentials=True,      # для cookies и авторизации
    allow_methods=["*"],         # какие HTTP методы разрешены
    allow_headers=["*"],         # какие заголовки разрешены
)

app.mount("/images", StaticFiles(directory="../images"), name="images")

Base.metadata.create_all(bind=engine)

app.include_router(car.router)
app.include_router(auth.router)
app.include_router(dev.router)