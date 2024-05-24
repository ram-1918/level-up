import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFire,
  faHomeLg,
  faMultiply,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SplotchIcon } from "./BaseIcons";

export const HomeButton = () => {
  return (
    <Link to="/" className="leading-6 tracking-wide text-md font-light">
      <FontAwesomeIcon icon={faHomeLg} />
    </Link>
  );
};

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Link
      to={".."}
      className="w-full p-1"
      onClick={() => {
        navigate(-1);
      }}
    >
      <span className="px-2 p-1 rounded bg-gray-100 hover:opacity-70 text-md font-light">
        <FontAwesomeIcon icon={faArrowLeft} /> Go back
      </span>
    </Link>
  );
};

export const BaseDoneForTheDay = () => {
  return (
    <span className="w-full p-2 bg-green-700 text-lg text-white text-center font-bold font-[cursive] rounded-full">
      Done for the day <SplotchIcon />
      <SplotchIcon className="text-[0.8rem]" />
    </span>
  );
};

export const BaseHoveringCancel = ({ ...props }) => {
  const [showDiv, setShowDiv] = useState(true);
  const toggleShowDiv = (e) => {
    e.preventDefault();
    setShowDiv((prev) => !prev);
  };
  const div = (
    <div
      onClick={(e) => toggleShowDiv(e)}
      className="absolute bg-trasparent w-full h-full flex justify-center items-center"
    >
      {showDiv && (
        <div {...props} className="bg-gray-300 w-fit px-2 rounded shadow-md">
          <span>Cancel</span> <FontAwesomeIcon icon={faMultiply} />
        </div>
      )}
    </div>
  );

  return div;
};
