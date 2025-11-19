const CarCard = ({ car, i }) => {
  return (
    <div key={i} className="car-card">
        <img src={car.img} alt={car.name} />
        <div className="car-name">{car.name}</div>
    </div>
  );
};

export default CarCard;