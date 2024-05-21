import { HomeButton, ThemeButton } from "./base/Base";
import { flex_row_style } from "./base/BaseStyles";

export default function Navbar() {
    return (
        <header className={`${flex_row_style} sticky top-0 z-10 justify-between px-2 py-1 bg-orange-200 dark:bg-blue-400`}>
            <HomeButton />
            <LevelupTitle />
            <ThemeButton />
        </header>
    );
}

const LevelupTitle = () => {
    return (
        <span className="text-4xl font-medium font-[cursive] underline underline-offset-2">LevelUp</span>
    );
};