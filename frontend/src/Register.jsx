import RegisterForm from './services/registerService';
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Auth.css'; 

const RegisterPage = () => {
  return (
    <div className="auth__wrapper">
      <div className="auth__container">
        <h2 className="auth__title">Create an account</h2>
        <RegisterForm></RegisterForm>
        <p className="auth__text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;