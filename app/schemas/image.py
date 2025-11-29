from pydantic import BaseModel

class ImageOut(BaseModel):
    id: int
    url: str

    class Config:
        from_attributes = True