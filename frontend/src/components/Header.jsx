import '../styles/Header.css';

import logo from '../assets/logo.png';

const Header = ({ isLoggedIn, userName }) => {
  return (
    <header className="header">
      <img src={logo} className="header__logo" />
      <nav className="auth-nav">
        {isLoggedIn ? (
          <div className="user-name">{userName}</div>
        ) : (
          <>
            <a href="/login" className="nav-link">Log In</a>
            <a href="/register" className="nav-link">Sign Up</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;