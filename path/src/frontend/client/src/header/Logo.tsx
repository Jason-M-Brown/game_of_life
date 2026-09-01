import Icon from "../assets/imgW.png";
import "./Logo.css";

function Logo() {
    return (
        <>
            <div className="logoContainer">
                 <img 
                    className="Logo"
                    src={Icon} 
                    alt="Game of life">
                </img>
            </div>
        </>
    );
};


export default Logo