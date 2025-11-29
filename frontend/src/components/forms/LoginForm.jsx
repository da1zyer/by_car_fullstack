import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from '../../components/Button'; 
import Input from '../../components/Input';

import { useAuth } from '../../services/AuthContext';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const LoginForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();

  const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser(username, password, fetchWithAuth);
    navigate("/cars");
  };

  return (
    <form className="auth__form" onSubmit={handleLogin}>
      <Input type="text" placeholder="Username" className="auth__input" onChange={e => setUsername(e.target.value)} value={username}/>

      <Input type="password" placeholder="Password" className="auth__input" onChange={e => setPassword(e.target.value)} value={password}/>

      <Button type="submit" className="auth__button" text="Log in"/>
    </form>
  );
};

export default LoginForm;