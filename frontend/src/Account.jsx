import './styles/Auth.css'; 
import Input from './components/Input';
import Header from './components/Header';
import './styles/Button.css'; 
import './styles/Input.css'; 
import './styles/Account.css'; 
import './styles/Header.css'; 

const AccountPage = () => {
    const isUserLoggedIn = false;
    const currentUserName = "Вован"; 
  return (
    <div className="account-wrapper">

        <Header 
            isLoggedIn={isUserLoggedIn} 
            userName={currentUserName} 
        />

      <div className="account-container">
        <h2 className="account-title">My Account</h2>

        <div className="account-name">GOLF</div>

      </div>
    </div>
  );
};

export default AccountPage;