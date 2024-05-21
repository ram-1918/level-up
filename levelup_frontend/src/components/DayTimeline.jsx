import img1 from '../assets/images/part1.png';
import img2 from '../assets/images/part2.png';
// import img3 from '../assets/images/part3.png';
import img4 from '../assets/images/part4.png';
import img5 from '../assets/images/part5.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DayTimelineForm from "./DayTimelineForm";
import { useState } from "react";

export default function DayTimeline() {
    const [submitStatus, setSubmitStatus] = useState(false);
    const props = {
        submitStatus: submitStatus,
        setSubmitStatus: setSubmitStatus
    }
    return (
        <div className="p-2 grid grid-cols-1 gap-4 justify-items-center tablet:grid-cols-3 ">
            <TimeLineCard img={img1} />
            <TimeLineCard img={img2} />
            <TimeLineCard img={img4} />
            <TimeLineCard img={img5} />
            {!submitStatus && <DayTimelineForm {...props} />}
        </div>
    );
}

const TimeLineCard = ({...props}) => {
    return (
        <div
        className={`
        select-none w-fit h-fit px-2 py-2 flex flex-col items-start justify-center space-y-2 rounded shadow border border-orange-200
        pointer-events-none
        `}>
            <PictureSpan {...props} />
            <div className="flex flex-col items-start justify-center space-y-2">
                <TitleSpan />
                <NoteSpan />
            </div>
        </div>
    );
};

const PictureSpan = ({img}) => {
    return (
        <div style={{minWidth: "200px", minHeight: "200px"}} className="flex items-center justify-center w-full min-h-96">
        <img alt="Proof" src={img}  className="object-scale-down h-full drop-shadow-md rounded m-auto" />
        </div>
    );
};

const TitleSpan = ({title='Default Title', date="May 20, 2024 at 7:36 PM"}) => {
    return (
        <div className="flex flex-col items-start justify-start">
            <span className="w-full text-xl font-medium">{title}</span>
            <span className="w-full text-sm font-extralight"><FontAwesomeIcon icon={faClock} className="text-gray-700 text-xs" /> {date}</span>
        </div>
    );
};

const NoteSpan = () => {
    const notes = `
    Now use copied URL to link your local repo with the remote GitHub repo. 
    When you clone a repository with git clone, it automatically creates a remote 
    connection called origin pointing back to the cloned repository. 
    The command remote is used to manage a set of tracked repositories.
    `
    return (
        <span className="text-md font-light leading-6 tracking-wide before:content-['Notes:'] before:font-medium">
            {notes}
        </span>
    );
};