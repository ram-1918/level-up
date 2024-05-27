import { useEffect, useRef } from "react";
import Routing from "./Routing";
import axios from 'axios';

// http://10.200.1.180:3000
// export const APIURL = 'http://127.0.0.1:8000/api';
// export const server = 'http://127.0.0.1:8000'; https://level-up-w6wd.onrender.com/admin/levelup/posts/

export const APIURL = 'https://level-up-w6wd.onrender.com/api';
export const server = 'https://level-up-w6wd.onrender.com';

function App() {
  const hasMadeAPICall = useRef(false);

  useEffect(() => {
    if(!hasMadeAPICall.current) {
      axios.get(`${APIURL}/streak`)
      .catch(error => console.log(error))
      hasMadeAPICall.current = true;
    }
  }, [hasMadeAPICall]);
  return <Routing />
}

export default App;
