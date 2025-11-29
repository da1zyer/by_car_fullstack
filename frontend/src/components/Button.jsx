import { useState } from "react";

import '../styles/Spinner.css'; 

const Button = ({ text, className, type="button", icon, onlyIcon = false, onClick = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };  
  
  return (
    <button 
      type={type} 
      className={`button ${className} ${icon ? "button__with-icon" : ""}`} 
      onClick={handleClick}
    >
      {isLoading 
      ? 
      (<span className={`${"spinner"} ${onlyIcon ? "spinner--icon-only" : ""}`}></span>) 
      : 
      (<img src={icon} className={`${icon ? "button__icon" : "button__icon--disabled"} ${onlyIcon ? "button--icon-only" : ""}`}/>)}
      {text}
    </button>
  );
};

export default Button;