from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.base import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    is_analyzed = Column(Boolean)

    car_id = Column(Integer, ForeignKey("cars.id"))

    car = relationship("Car", back_populates="images")
