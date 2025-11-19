import Input from './components/Input';
import Button from './components/Button';
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Auth.css'; 

const RegisterPage = () => {
  return (
    <div className="auth__wrapper">

      <div className="auth__container">
        <h2 className="auth__title">Create an account</h2>

        <form className="auth__form">
          <Input type="email" placeholder="Email" className="auth__input"/>

          <Input type="password" placeholder="Password" className="auth__input"/>

          <Input type="password" placeholder="Repeat password" className="auth__input"/>

          <Button type="submit" className="auth__button" text="Sign Up"/>
        </form>

        <p className="auth__text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;