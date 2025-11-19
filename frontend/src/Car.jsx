import './styles/Car.css'; 
import Button from './components/Button'; 
import Input from './components/Input'; 
import Header from './components/Header'; 
import ImageCard from './components/Image'; 
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Input.css'; 
import './styles/Image.css'; 

import upload_icon from './assets/upload.png';
import copy_icon from './assets/copy.png';

const CarPage = () => {
    const isUserLoggedIn = false;
    const currentUserName = "Вован"; 

  const cars = [
    {
      name: "Volkswagen Golf VII",
      img: "https://avatars.mds.yandex.net/get-autoru-vos/16989297/388a4d0a7d5409aa19e56e08eb928cdf/1200x900n",
    },
    {
      name: "Volkswagen Golf VII",
      img: "https://avatars.mds.yandex.net/get-autoru-vos/16989297/388a4d0a7d5409aa19e56e08eb928cdf/1200x900n",
    },
    {
      name: "Porsche 911",
      img: "https://avatars.mds.yandex.net/get-autoru-vos/16989297/388a4d0a7d5409aa19e56e08eb928cdf/1200x900n",
    },
    {
      name: "Subaru Impreza",
      img: "https://avatars.mds.yandex.net/get-autoru-vos/16989297/388a4d0a7d5409aa19e56e08eb928cdf/1200x900n",
    },
  ];

  return (
    <div className="car-container">
        <Header 
            isLoggedIn={isUserLoggedIn} 
            userName={currentUserName} 
        />

        <div className="car__controls">
            <div className="controls__car-name">GOLF</div>

            <div className="controls__buttons">
              <Button text="Copy link" className="controls__button1" icon={copy_icon} />
              <Button text="Upload image" className="controls__button2" icon={upload_icon} />
            </div>
        </div>

        <div className="images__grid">
            {cars.map((car, i) => (
                <ImageCard car = {car} i = {i}/>
            ))}
        </div>
    </div>
  );
};

export default CarPage;