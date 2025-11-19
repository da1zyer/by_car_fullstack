import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Landing.jsx'; 
import LoginPage from './Login.jsx'
import RegisterPage from './Register.jsx'
import CarsPage from './Cars.jsx'
import CarPage from './Car.jsx'
import AccountPage from './Account.jsx'

import './styles/App.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/car" element={<CarPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}

export default App;