import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeButton, ThemeButton } from "./base/Base";
import { ThemeIcon } from "./base/BaseIcons";
import { flex_row_style } from "./base/BaseStyles";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { APIURL } from "../App";
import axios from "axios";

export default function Navbar() {
    const [streak, setStreak] = useState(0);
    useEffect(() => {
        axios.get(`${APIURL}/get-streak`)
        .then(resp => {setStreak(resp.data.streak); console.log(resp.data)})
    }, []);
    return (
        <header className={`${flex_row_style} sticky top-0 z-10 justify-between px-2 py-1 bg-orange-200 dark:bg-blue-400`}>
            <LevelupTitle />
            <div className="flex flex-row justify-between items-center space-x-2">
                <ThemeIcon />
                <StreakDisplay streak={streak} />
                <HomeButton />
            </div>
        </header>
    );
}

const LevelupTitle = () => {
    return (
        <span className="text-4xl font-medium font-[cursive] underline underline-offset-2">LevelUp</span>
    );
};

const StreakDisplay = ({streak}) => <span className="px-3">{streak} <FontAwesomeIcon icon={faFireAlt} /></span>