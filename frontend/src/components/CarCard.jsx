const CarCard = ({ car, i }) => {

  const handleClick = () => {
    window.open(`/cars/${car.id}`, '_blank');
  };

  return (
    <div key={i} className="car-card" onClick={handleClick}>
      <img src={car.img} alt={car.title} />
      <div className="car-name">{car.title}</div>
    </div>
  );
};

export default CarCard;