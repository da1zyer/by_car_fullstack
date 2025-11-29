import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'; 
import Input from '../components/Input'; 

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        if (password != passwordR) {
            alert("Пароли не совпадают");
            return 0;
        }

      console.log(username, password)
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        username: username,
        email: email,
        password: password,
    })
      });
      const data = await response.json();

      alert(data.detail || "Ошибка авторизации");

      navigate("/login"); 

    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  return (
    <form className="auth__form" onSubmit={handleRegister}>
            <Input type="text" placeholder="Username" className="auth__input" onChange={e => setUsername(e.target.value)} value={username}/>

          <Input type="email" placeholder="Email" className="auth__input" onChange={e => setEmail(e.target.value)} value={email}/>

          <Input type="password" placeholder="Password" className="auth__input" onChange={e => setPassword(e.target.value)} value={password}/>

          <Input type="password" placeholder="Repeat password" className="auth__input" onChange={e => setPasswordR(e.target.value)} value={passwordR}/>

          <Button type="submit" className="auth__button" text="Sign Up"/>
    </form>
  );
};



export default RegisterForm;
