import { useEffect, useState } from "react";

import Button from './components/Button'; 
import Input from './components/Input'; 
import Header from './components/Header'; 
import CarCard from './components/CarCard'; 
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/CarCard.css'; 
import './styles/Cars.css'; 

import { getAllCars, getImages, createCar, createCarManually } from "./services/carService";
import { useFetchWithAuth } from './hooks/useFetchWithAuth';
import { useAuth } from './services/AuthContext';

import plus_icon from './assets/plus.png';
import download_icon from './assets/download.png';

const CarsPage = () => {

  const fetchWithAuth = useFetchWithAuth();
  const { isAuthenticated, accessToken } = useAuth();
  const [link, setLink] = useState("");
  const [cars, setCars] = useState([]);

  const handleCreateCar = async () => {
    await createCar(fetchWithAuth, link);
    window.location.reload();
  };

  const handleCreateCarManually = async () => {
    await createCarManually(fetchWithAuth, "Car");
    window.location.reload();
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars(fetchWithAuth);
        const carsData = [];

        for (const car of data) {
          const imagesData = await getImages(fetchWithAuth, car.id);
          carsData.push({
            id: car.id,
            title: car.title,
            img: imagesData[0]?.url || "",
          });
        }
        setCars(carsData);
      } catch (err) {
        console.error("Ошибка при загрузке машин:", err);
      }
    };

    if (accessToken) { 
        fetchCars();
    }
  }, [accessToken]);

  return (
    <div className="cars">
      <Header/>

      <div className="cars__controls">
        <Input 
          type="text" 
          placeholder="Paste here link from auto.ru" 
          className="cars__input" 
          value={link} 
          onChange={e => setLink(e.target.value)}
        />

        <Button 
          text="Create car page" 
          className="cars__button1 button--blink" 
          icon={download_icon} 
          onClick={handleCreateCar}
        />

        <Button 
          text="Create page manually" 
          className="cars__button2" 
          icon={plus_icon} 
          onClick={handleCreateCarManually}
        />
      </div>

      <div className="cars__grid">
        {cars.map((car, i) => (
          <CarCard car = {car} i = {i}/>
        ))}
      </div>
    </div>
  );  
};

export default CarsPage;