from pydantic import BaseModel, EmailStr, StrictStr

class LoginModel(BaseModel):
    username: StrictStr
    password: StrictStr

class RegisterModel(BaseModel):
    email: EmailStr
    username: StrictStr
    password: StrictStr

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True