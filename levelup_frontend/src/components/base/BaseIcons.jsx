import { faAdjust, faFish, faSplotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const SplotchIcon = ({...props}) => <FontAwesomeIcon {...props} icon={faSplotch} />;
export const FishIcon = ({...props}) => <FontAwesomeIcon {...props} icon={faFish} />;

export const ThemeIcon = () => {
    // if dark, left-black; right-white; border-r-0
    // if light, left-white; right-black; border-l-0
    const [isDark, setIsDark] = useState(false);
    const handleTheme = () => {
      setIsDark(!isDark);
      document.body.classList.toggle("dark");
    };

    return (
        <div onClick={() => handleTheme()} className="border-0 border-black rounded-full flex flex-row">
            <div className={`${isDark ? 'bg-black border-r-0' : 'bg-white'} border border-black px-1 py-2 rounded-tl-full rounded-bl-full`}></div>
            <div className={`${isDark ? 'bg-white' : 'bg-black border-l-0'} border border-black px-1 py-2 rounded-tr-full rounded-br-full`}></div>
        </div>
    );
};