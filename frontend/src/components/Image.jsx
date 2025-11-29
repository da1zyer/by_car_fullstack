const ImageCard = ({ image, i }) => {
  return (
    <div key={i} className="image-card">
      <img src={image.url} alt={1} />
    </div>
  );
};

export default ImageCard;