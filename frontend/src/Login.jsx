import Input from './components/Input';
import Button from './components/Button';
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Auth.css'; 

const LoginPage = () => {
  return (
    <div className="auth__wrapper">

      <div className="auth__container">
        <h2 className="auth__title">Log in</h2>

        <form className="auth__form">
          <Input type="email" placeholder="Email" className="auth__input"/>

          <Input type="password" placeholder="Password" className="auth__input"/>

          <Button type="submit" className="auth__button" text="Log in"/>
        </form>

        <p className="auth__text">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;