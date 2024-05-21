import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import YearsGrid from "./components/YearsGrid";
import MonthsGrid from "./components/MonthsGrid";
import DaysGrid from "./components/DaysGrid";
import DayTimeline from "./components/DayTimeline";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route index path='' element={<YearsGrid />} ></Route>
                    <Route path=':year' element={<MonthsGrid />} ></Route>
                    <Route path=':year/:month' element={<DaysGrid />} ></Route>
                    <Route path=':year/:month/:day' element={<DayTimeline />} ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}