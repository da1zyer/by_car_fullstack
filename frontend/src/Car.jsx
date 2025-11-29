import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from './components/Button'; 
import Header from './components/Header'; 
import ImageCard from './components/Image'; 
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Image.css'; 
import './styles/Car.css'; 

import { getCar, getImages, createImage, deleteCar } from "./services/carService";
import { useFetchWithAuth } from './hooks/useFetchWithAuth';
import { useAuth } from './services/AuthContext';

import upload_icon from './assets/upload.png';
import copy_icon from './assets/copy.png';
import delete_icon from './assets/delete.png';

const CarPage = () => {

  const { accessToken } = useAuth();
  const fetchWithAuth = useFetchWithAuth();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [carTitle, setCarTitle] = useState("");
  const [carId, setCarId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const { id } = useParams();

  const fileInputRef = useRef(null);
    
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const imagesData = await getImages(fetchWithAuth, id);
        const carData = await getCar(fetchWithAuth, id);
        setImages(imagesData);
        setCarTitle(carData.title)
        setCarId(carData.id)
      } catch (err) {
        console.error("Ошибка при загрузке машин:", err);
      }
    };
    if (accessToken) { 
      fetchCars();
    }
  }, [accessToken]);

  const uploadFileToServer = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const newImage = await createImage(fetchWithAuth, carId, formData); 
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    } finally {
      setSelectedFile(null);
      window.location.reload();
    }
  };
    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
        
    if (file) {
      setSelectedFile(file); 
      uploadFileToServer(file);  
      event.target.value = '';
    }
  };

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteCar = () => {
    deleteCar(fetchWithAuth, carId);
    navigate("/cars");
  };


  return (
    <div className="car-container">
      <Header/>

      <div className="car__controls">
        <div className="controls__car-name">{carTitle}</div>

        <div className="controls__buttons">
          <Button 
            text="Copy link" 
            className="controls__button1" 
            icon={copy_icon} 
          />
          <input 
            type="file" 
            id="uploadInput" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{display: 'none'}}
          />
          <Button 
            id="uploadButton" 
            text="Upload image" 
            className="controls__button2" 
            icon={upload_icon} 
            onClick={handleCustomButtonClick} 
            disabled={!!selectedFile}
          />
          <Button 
            text="" 
            className="controls__button3" 
            icon={delete_icon} 
            onlyIcon={true} 
            onClick={handleDeleteCar}
          />
        </div>
      </div>

      <div className="images__grid">
        {images.map((image, i) => (
          <ImageCard image={image} i = {i}/>
        ))}
      </div>
    </div>
  );
};

export default CarPage;