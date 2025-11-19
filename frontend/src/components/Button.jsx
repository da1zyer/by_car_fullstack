import { useState } from "react";

import '../styles/Spinner.css'; 

const Button = ({ text, className, type="button", icon }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 2000);
  };  
  
  return (
    <button type={type} className={`button ${className} ${icon ? "button__with-icon" : ""}`} onClick={handleClick}>
        {isLoading ? (<span className="spinner"></span>) : (<img src={icon} className={icon ? "button__icon" : "button__icon--disabled"} />)}
        {text}
    </button>
  );
};

export default Button;