import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DayTimelineForm from "../components/DayTimelineForm";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from 'react-router';
import axios from 'axios';
import {APIURL, server} from '../App';
import { months } from './MonthsGrid';
import { BaseDoneForTheDay } from "../components/base/Base";

// http://127.0.0.1:8000/api/proof/list?year=2024&month=5&day=21


export default function DayTimeline() {
    const { year, month, day } = useParams();
    const {setTrack, setCurrentPath} = useOutletContext();
    useEffect(() => {setTrack(`years.months.days.timeline`);}, [setTrack]);
  useEffect(() => {setCurrentPath(`${year} / ${month} / ${day}`);}, [setCurrentPath]);


    const today = new Date();
    const [submitStatus, setSubmitStatus] = useState(false);
    const [timelinedata, setTimelineData] = useState([]);
    const current_month_idx = months.findIndex(item => item.month === month) + 1;
    
    useEffect(() => {
        const URL = `${APIURL}/proof/list?year=${year}&month=${current_month_idx}&day=${day}`;
        axios.get(URL)
        .then(resp => {setTimelineData(resp.data.data);})
        .catch(err => console.log(err))

    }, [setTimelineData, current_month_idx, day, year]);

    const props = {
        submitStatus: submitStatus,
        setSubmitStatus: setSubmitStatus
    }

    // If it is today() ?
    const isToday = () => {
        if (parseInt(year) === today.getFullYear() && current_month_idx === today.getMonth() + 1 && parseInt(day) === today.getDate()) {
            return true;
        }
        return false;
    }

    // Other days with no proofs submitted
    if (!isToday() && timelinedata.length === 0) {
        return <div className="w-full h-full bg-gray-100 text-gray-400 font-semibold p-2 my-4">No proofs found</div>
    }

    return (
        <div className="p-2 grid grid-cols-1 gap-4 justify-items-center tablet:grid-cols-1 laptop:px-[20%] ">
            {timelinedata.length !== 0 && timelinedata.map(item => <TimeLineCard key={item.id} {...item} />)}
            {isToday() && timelinedata.length < 4 && `${4 - timelinedata.length} more ${4 - timelinedata.length === 1 ? 'proof': 'proofs'} needed`}
            {isToday() && timelinedata.length < 4 && <DayTimelineForm setTimelineData={setTimelineData} {...props} />}
            {isToday() && timelinedata.length === 4 && <BaseDoneForTheDay />}
        </div>
    );
}

const TimeLineCard = ({...props}) => {
    return (
        <div
        className={`
        select-none w-full h-fit px-2 py-2 flex flex-col items-start justify-center space-y-2 rounded shadow border border-orange-200
        pointer-events-none
        `}>
            <div className="h-[80%] w-full">
                <PictureSpan {...props} />
            </div>
            <div className="h-[20%] w-full flex flex-col items-start justify-center space-y-2">
                <TitleSpan {...props} />
                <NoteSpan {...props} />
            </div>
        </div>
    );
};

const PictureSpan = ({image}) => {
    const croppedURL = String(image).split(server);
    const finalRes = croppedURL[croppedURL.length - 1];
    return (
        <div style={{minWidth: "200px", minHeight: "200px"}} className="relative h-96 min-h-fit w-full">
            <img alt="Oops Invalid" src={`${server}${finalRes}`}  className="object-cover absolute inset-0 h-full w-full rounded-lg shadow-sm" />
        </div>
    );
};

const TitleSpan = ({title='Default Title', created_at="May 20, 2024 at 7:36 PM"}) => {
    return (
        <div className="flex flex-col items-start justify-start">
            <span className="w-full text-xl font-medium">{title}</span>
            <span className="w-full text-sm font-extralight"><FontAwesomeIcon icon={faClock} className="text-gray-700 text-xs" /> {created_at}</span>
        </div>
    );
};

const NoteSpan = ({notes}) => {
    // const notes = `
    // Now use copied URL to link your local repo with the remote GitHub repo. 
    // When you clone a repository with git clone, it automatically creates a remote 
    // connection called origin pointing back to the cloned repository. 
    // The command remote is used to manage a set of tracked repositories.
    return (
        <span className="text-md font-light leading-6 tracking-wide before:content-['Notes:'] before:font-medium">
            {notes}
        </span>
    );
};