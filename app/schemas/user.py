from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr = Field(
        ..., 
        example="test@gmail.com", 
        description="Email пользователя"
    )
    username: str = Field(
        ..., 
        min_length=3,
        max_length=20, 
        example="test", 
        description="Имя пользователя"
    )
    password: str = Field(
        ..., 
        example="test", 
        description="Пароль"
    )

class UserLogin(BaseModel):
    username: str = Field(
        ..., 
        min_length=3, 
        max_length=20, 
        example="test", 
        description="Имя пользователя")
    password: str = Field(
        ..., 
        example="test", 
        description="Пароль")

class UserOut(BaseModel):
    id: int
    email: str
    username: str

    class Config:
        orm_mode = True