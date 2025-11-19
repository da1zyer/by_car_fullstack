import Header from './components/Header'; 
import './styles/Landing.css'; 

import carImage from './assets/porsche.png'; 

const LandingPage = () => {
    const isUserLoggedIn = false;
    const currentUserName = "Вован"; 

    return (
        <div className="landing-container">
            <Header 
                isLoggedIn={isUserLoggedIn} 
                userName={currentUserName} 
            />
            <main className="main-content">
                
                <div className="text-section">
                    <h1 className="heading">
                        <span className="line">YOUR SECOND</span>
                        <span className="line">GLANCE</span>
                    </h1>
                    <button className="start-button">
                        start using
                    </button>   
                </div>

                <div className="image-section">
                    <img 
                        src={carImage} 
                        className="car-image"
                    />
                    <div className="highlight-overlay">
                        <div className="rust-label">rust [99%]</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;