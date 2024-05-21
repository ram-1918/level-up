import { Outlet } from "react-router";
import Navbar from "./components/Navbar";


function Home() {
  const screenStyles = "mobile:bg-white tablet:bg-blue-300 laptop:bg-green-400";
  return (
      <div className={`${screenStyles}`}>
        <Navbar />
        <Outlet />
      </div>
  );
}

export default Home;
