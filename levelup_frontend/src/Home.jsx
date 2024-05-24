import { Outlet } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import PathTrace from "./components/PathTrace";

function Home() {
  const screenStyles = "mobile:bg-white tablet:bg-blue-300 laptop:bg-green-400";
  const [track, setTrack] = useState("");
  return (
    <div className={`${screenStyles}`}>
      <Navbar />
      <PathTrace track={track} setTrack={setTrack} />
      <Outlet context={[setTrack]} />
    </div>
  );
}

export default Home;



