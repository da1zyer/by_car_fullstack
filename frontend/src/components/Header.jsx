// frontend/src/components/Header.jsx

import React from 'react';
import '../styles/Header.css';

const Header = ({ isLoggedIn, userName }) => {
  return (
    <header className="header-container">
      <div className="logo">Logo</div>
      <nav className="auth-nav">
        {isLoggedIn ? (
          <div className="user-info">
            Привет, <span className="user-name">{userName}</span>
          </div>
        ) : (
          <>
            <a href="/login" className="nav-link">Log In</a>
            <a href="/signup" className="nav-link primary-button">Sign Up</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;