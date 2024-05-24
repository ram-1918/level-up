import { useState } from "react";
import { BaseHoveringCancel } from "./base/Base";
import axios from 'axios';
import { APIURL } from '../App';

const initialValue = {
    title: '',
    image: null,
    notes: ''
}

// http://127.0.0.1:8000/api/send-proof

export default function DayTimelineForm({setTimelineData}) {
    const [newdata, setNewData] = useState(initialValue);
    const [msg, setMsg] = useState('');

    const formdata = new FormData();

    const handleCreatePost = e => {
        e.preventDefault();
        formdata.append('title', newdata.title);
        formdata.append('image', newdata.image);
        formdata.append('notes', newdata.notes);

        const URL = `${APIURL}/send-proof`
        axios.post(URL, formdata, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        .then(resp => {
            console.log('While Upload', resp.data);
            if(resp.data === 'Enough for the day') {
                setMsg(resp.data);
            } else {
                setTimelineData(prev => [...prev, {...resp.data, 'image': resp.data.image}]);
                setNewData(initialValue);
            }
        })
        .catch(err => console.log(err))
    }

    const props = {
        newdata: newdata,
        setNewData: setNewData
    }
    return (
        <div
        className={`
        select-none w-full h-fit px-2 py-3 flex flex-col items-start justify-center space-y-2 rounded shadow-lg border border-orange-500
        `}>
            <span className='w-full text-center font-medium text-xl px-2'>Add a New Proof</span>
            {msg && msg}
            <PictureSpan {...props} />
            <div className=" w-full flex flex-col items-start justify-center space-y-2">
                <TitleSpan {...props} />
                <NoteSpan {...props} />
            </div>
            <div className="w-full text-right">
                <button
                onClick={e => handleCreatePost(e)}
                className="rounded px-4 py-1 bg-gray-200 text-lg font-medium shadow-md hover:opacity-70">
                    Post
                </button>
            </div>
        </div>
    );
};

const PictureSpan = ({newdata:{image}, setNewData}) => {
    const [preview, setPreview] = useState(null);

    const handleImageUpload = e => {
        e.preventDefault()
        setNewData(prev => ({...prev, 'image':e.target.files[0]}));
        setPreview(URL.createObjectURL(e.target.files[0]));    // Produces preview
    }
    const cancelImageUpload = e => {
        e.preventDefault();
        setNewData(prev => ({...prev, 'image': null}));
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

const TitleSpan = ({newdata:{title}, setNewData}) => {
    return (
        <div className="w-full flex flex-col items-start justify-start">
            <input 
            type="text" 
            value={title}
            placeholder="Enter a catchy title..."
            className="outline-none border border-gray-300 rounded w-full p-1 text-xl font-medium"
            onChange={e => setNewData(prev => ({...prev, 'title': e.target.value}))} />
        </div>
    );
};

const NoteSpan = ({newdata:{notes}, setNewData}) => {
    return (
        <span className="w-full text-md font-light leading-6 tracking-wide before:content-['Notes:'] before:font-medium">
            <textarea 
            value={notes}
            onChange={e => setNewData(prev => ({...prev, "notes": e.target.value}))}
            className="border border-gray-300 outline-none rounded w-full p-1" placeholder="Add a short note..." />
        </span>
    );
};