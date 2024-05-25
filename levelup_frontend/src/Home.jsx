import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PathTrace from "./components/PathTrace";
import axios from "axios";
import { APIURL } from "./App";

function Home() {
  const screenStyles = "mobile:bg-white tablet:bg-blue-300 laptop:bg-green-400";
  const [track, setTrack] = useState("");
  const [postsCount, setPostsCount] = useState([]);

  useEffect(() => {
    axios.get(`${APIURL}/posts/count`)
    .then(resp => {setPostsCount(resp.data);console.log(resp.data)})
    .catch(err => console.log(err))
}, [])
  return (
    <div className={`${screenStyles}`}>
      <Navbar />
      <PathTrace track={track} setTrack={setTrack} />
      {/* {JSON.stringify(postsCount)} */}
      {postsCount.length !== 0 && <Outlet context={{setTrack:setTrack, postsCount:postsCount}} />}
    </div>
  );
}

export default Home;



