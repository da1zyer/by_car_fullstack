import Button from './components/Button'; 
import Input from './components/Input'; 
import Header from './components/Header'; 
import CarCard from './components/CarCard'; 
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/CarCard.css'; 
import './styles/Cars.css'; 

import plus_icon from './assets/plus.png';
import download_icon from './assets/download.png';

const CarsPage = () => {
    const isUserLoggedIn = true;
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
    <div className="cars">
        <Header
            isLoggedIn={isUserLoggedIn}
            userName={currentUserName}
        />

        <div className="cars__controls">
            <Input type="text" placeholder="Paste here link from auto.ru" className="cars__input"/>

            <Button text="Create car page" className="cars__button1 button--blink" icon={download_icon}/>

            <Button text="Create page manually" className="cars__button2" icon={plus_icon}/>
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