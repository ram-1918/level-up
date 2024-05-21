import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHomeLg, faMultiply, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HomeButton = () => {
    return (
        <Link 
        to="/years" 
        className="leading-6 tracking-wide text-sm font-light">
            <FontAwesomeIcon icon={faHomeLg} />
        </Link>
    );
};

export const ThemeButton = () => {
    const [isDark, setIsDark] = useState(false);
    const handleTheme = () => {
        setIsDark(!isDark);
        document.body.classList.toggle("dark");
    }
    return (
        <span 
        onClick={() => handleTheme()} 
        className="leading-6 tracking-wide text-md font-light">
            {isDark ? <FontAwesomeIcon icon={faFire} /> : <FontAwesomeIcon icon={faSnowflake} />}
        </span>
    );
};

export const BaseHoveringCancel = ({...props}) => {
    const [showDiv, setShowDiv] = useState(true);
    const toggleShowDiv = e => {
        e.preventDefault();
        setShowDiv(prev => !prev);
    }
    const div = (
        <div onClick={e => toggleShowDiv(e)} className="absolute bg-trasparent w-full h-full flex justify-center items-center">
            {showDiv && 
                <div {...props} className="bg-gray-300 w-fit px-2 rounded shadow-md">
                    <span>Cancel</span> {' '}
                    <FontAwesomeIcon icon={faMultiply} />
                </div>
            }
        </div>
    );
    
    return div;
};