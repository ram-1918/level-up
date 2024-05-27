import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import YearsGrid from "./pages/YearsGrid";
import MonthsGrid from "./pages/MonthsGrid";
import DaysGrid from "./pages/DaysGrid";
import DayTimeline from "./pages/DayTimeline";
import EnterPage from "./pages/EnterPage";
import PrivateRoute from "./components/PrivateRoute";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<EnterPage />} ></Route>
                <Route path='home/' element={<PrivateRoute />} >
                    <Route path='' element={<Home />}>
                        <Route index path='' element={<YearsGrid />} ></Route>
                        <Route path=':year' element={<MonthsGrid />} ></Route>
                        <Route path=':year/:month' element={<DaysGrid />} ></Route>
                        <Route path=':year/:month/:day' element={<DayTimeline />} ></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}