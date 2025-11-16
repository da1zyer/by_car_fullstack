from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base import Base

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True)
    title = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="cars")

    images = relationship("Image", back_populates="car")
