import '../styles/Header.css';

import logo from '../assets/logo.png';

import { useAuth } from '../services/AuthContext';

const Header = () => {

  const { isAuthenticated, user } = useAuth();

  return (
    <header className="header">
      <img src={logo} className="header__logo" />
      <nav className="auth-nav">
        {isAuthenticated 
        ? 
        (<div className="user-name">{user?.username}</div>) 
        : 
        (<>
          <a href="/login" className="nav-link">Log In</a>
          <a href="/register" className="nav-link">Sign Up</a>
        </>)}
      </nav>
    </header>
  );
};

export default Header;