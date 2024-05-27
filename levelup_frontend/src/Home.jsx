import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PathTrace from "./components/PathTrace";
import axios from "axios";
import { APIURL } from "./App";

function Home() {
  const screenStyles = "mobile:bg-white";
  const [track, setTrack] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [postsCount, setPostsCount] = useState([]);

  useEffect(() => {
    axios.get(`${APIURL}/posts/count`)
    .then(resp => {setPostsCount(resp.data)})
    .catch(err => console.log(err))
}, []);

const props = {
  setTrack:setTrack, 
  setCurrentPath:setCurrentPath, 
  postsCount:postsCount
}
  return (
    <div className={`${screenStyles}`}>
      <Navbar />
      <PathTrace track={track} setTrack={setTrack} />
      <CurrentPathTrace path={currentPath} />
      {postsCount.length !== 0 && <Outlet context={props} />}
    </div>
  );
}

export default Home;

const CurrentPathTrace = ({path}) => {
  return <span className="leading-6 tracking-wide capitalize px-2 py-1 font-medium text-md">{path}</span>
}



