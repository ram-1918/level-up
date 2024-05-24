import { useEffect, useRef } from "react";
import Routing from "./Routing";
import axios from 'axios';

// http://10.200.1.180:3000
export const APIURL = 'http://127.0.0.1:8000/api';
export const server = 'http://127.0.0.1:8000';

function App() {
  const hasMadeAPICall = useRef(false);

  useEffect(() => {
    if(!hasMadeAPICall.current) {
      axios.get(`${APIURL}/streak`)
      .then(resp => {console.log(resp.data)})
      .catch(error => console.log(error))
      hasMadeAPICall.current = true;
    }
  }, [hasMadeAPICall]);
  return <Routing />
}

export default App;
