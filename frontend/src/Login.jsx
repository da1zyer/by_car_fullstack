import LoginForm from './components/forms/LoginForm';
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Auth.css'; 

const LoginPage = () => {
  return (
    <div className="auth__wrapper">
      <div className="auth__container auth__login-container">
        <h2 className="auth__title">Log in</h2>
        <LoginForm></LoginForm>
        <p className="auth__text">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;