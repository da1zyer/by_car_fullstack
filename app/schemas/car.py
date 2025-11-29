from pydantic import BaseModel, Field, HttpUrl

class CarCreate(BaseModel):
    title: str | None = Field(
        None, 
        max_length=50, 
        description="Название машины"
    )
    url: str | None = Field(
        None, 
        description="Ссылка на объявление"
    )

class CarOut(BaseModel):
    id: int
    title: str
    url: str | None

    class Config:
        from_attributes = True

