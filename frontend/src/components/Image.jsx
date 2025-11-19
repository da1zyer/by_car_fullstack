const ImageCard = ({ car, i }) => {
  return (
    <div key={i} className="image-card">
        <img src={car.img} alt={car.name} />
    </div>
  );
};

export default ImageCard;