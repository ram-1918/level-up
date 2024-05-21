import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faClock, faCross, faMultiply } from "@fortawesome/free-solid-svg-icons";
import img1 from '../assets/images/part1.png';
import { useState } from "react";
import { BaseHoveringCancel } from "./base/Base";

export default function DayTimelineForm({...props}) {
    return (
        <div className="p-2 grid grid-cols-1 gap-4 justify-items-center tablet:grid-cols-3 ">
            <TimeLineCard img={img1} {...props} />
        </div>
    );
}

const TimeLineCard = ({...props}) => {
    return (
        <div
        className={`
        select-none w-full h-fit px-2 py-3 flex flex-col items-start justify-center space-y-2 rounded shadow border border-orange-500
        `}>
            <span className='w-full text-center font-medium text-xl px-2'>Add a New Proof</span>
            <PictureSpan {...props} />
            <div className=" w-full flex flex-col items-start justify-center space-y-2">
                <TitleSpan {...props} />
                <NoteSpan {...props} />
            </div>
            <div className="w-full text-right">
                <button className="rounded px-4 py-1 bg-gray-200 text-lg font-medium shadow-md hover:opacity-70">Post</button>
            </div>
        </div>
    );
};

const PictureSpan = ({...props}) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageUpload = e => {
        e.preventDefault()
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));    // Produces preview
    }
    const cancelImageUpload = e => {
        e.preventDefault();
        setImage(null);
        setPreview(null);
    }
    return (
        <div style={{minWidth: "200px", minHeight: "200px"}} className="relative border border-gray-300 flex items-center justify-center w-full min-h-96">
            {image !== null ? 
            <img alt="Proof" src={preview}  className="object-scale-down h-full drop-shadow-md rounded m-auto" /> :
            <input 
                type="file"
                accept=".png, .jpeg, .jpg"
                className={`
                w-full flex flex-col justify-center items-center 
                file:rounded-full file:border-none file:px-2 file:bg-gray-200 file:text-gray-500
                `}
                onChange={e => handleImageUpload(e)} 
            />
            }
            {image !== null && <BaseHoveringCancel onClick={e => cancelImageUpload(e)} />}
        </div>
    );
};

const TitleSpan = ({title='Default Title', date="May 20, 2024 at 7:36 PM"}) => {
    const [newtitle, setNewTitle] = useState('');
    return (
        <div className="w-full flex flex-col items-start justify-start">
            <input 
            type="text" 
            placeholder="Enter a catchy title..."
            className="outline-none border border-gray-300 rounded w-full p-1 text-xl font-medium"
            onChange={e => setNewTitle(e.target.value)} />
        </div>
    );
};

const NoteSpan = () => {
    return (
        <span className="w-full text-md font-light leading-6 tracking-wide before:content-['Notes:'] before:font-medium">
            <textarea className="border border-gray-300 outline-none rounded w-full p-1" placeholder="Add a short note..." />
        </span>
    );
};