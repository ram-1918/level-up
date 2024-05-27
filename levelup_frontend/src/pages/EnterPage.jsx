import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { LevelupTitle } from "../components/Navbar";

export default function EnterPage() {
    const [enteredPin, setEnteredPin] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const pin_from_local = localStorage.getItem('pcd');
        if(pin_from_local !== null) {
            // setActualPin(pin_from_local);
            navigate('/home');
        }
    }, []);

    const handleLogin = () => {
        if(enteredPin === '') {
            setMsg('Enter your pin please');
        }
        if (enteredPin.trim(' ') === '8324741918') {
            localStorage.setItem('pcd', true);
            navigate('/home/');
        }
    }

    return (
        <div className="absolute flex flex-col justify-center items-center w-full h-full space-y-4 bg-orange-100">
            <LevelupTitle />
            {msg && <span className="text-xm p-2 font-light">{msg}</span>}
            <div className="flex flex-col justify-center items-center space-y-2">
                <input className="w-72 px-2 py-2 text-xl tracking-wide leading-7 font-light outline-none border rounded-lg" type="text" onChange={e => {setMsg(''); setEnteredPin(e.target.value)}} />
                <button 
                onClick={() => handleLogin()}
                className="hover:text-slate-500">Get Access <FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
    );
}