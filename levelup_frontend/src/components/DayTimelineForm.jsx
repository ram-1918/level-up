import { useEffect, useRef, useState } from "react";
import { BaseHoveringCancel } from "./base/Base";
import axios from 'axios';
import { APIURL } from '../App';
import EXIF from 'exif-js';
import * as exifr from 'exifr';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCameraAlt, faMultiply } from "@fortawesome/free-solid-svg-icons";

const initialValue = {
    title: '',
    image: null,
    notes: ''
}

// http://127.0.0.1:8000/api/send-proof

export default function DayTimelineForm({setTimelineData}) {
    const [newdata, setNewData] = useState(initialValue);
    const [msg, setMsg] = useState('');
    const [isStartCamera, setIsStartCamera] = useState(false);

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
                setIsStartCamera(!isStartCamera);
            } else {
                setTimelineData(prev => [...prev, {...resp.data, 'image': resp.data.image}]);
                setNewData(initialValue);
                setIsStartCamera(!isStartCamera);
            }
        })
        .catch(err => console.log(err))
    }

    const props = {
        newdata: newdata,
        setNewData: setNewData,
        isStartCamera: isStartCamera , 
        setIsStartCamera: setIsStartCamera
    }
    return (
        <div
        className={`
        select-none w-full h-full px-2 py-3 flex flex-col items-start justify-center space-y-2 
        rounded shadow-lg border border-orange-500 laptop:px-[20%]
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

const PictureSpan = ({newdata:{image}, setNewData,  isStartCamera, setIsStartCamera}) => {
    const [preview, setPreview] = useState(null);
    const [uploadType, setUploadType] = useState('');
    const [exifData, setExifData] = useState('');

    // const handleImageUpload = event => {
    //     event.preventDefault()
    //     const file = event.target.files[0];
    //     // if (file) {
    //     //     const reader = new FileReader();
    //     //     reader.onload = async (e) => {
    //     //     //   const imgSrc = e.target.result;
    //     //       try {
    //     //         const exif = await exifr.parse(file);
    //     //         setExifData(exif);
    //     //         analyzeExifData(exif);
    //     //       } catch (error) {
    //     //         console.error("Error reading EXIF data:", error);
    //     //       }
    //     //     };
    //     //     reader.readAsDataURL(file);
    //     //   }
    //     setNewData(prev => ({...prev, 'image':file}));
    //     setPreview(URL.createObjectURL(file));    // Produces preview
    // };
    // const analyzeExifData = (data) => {
    //     if (data.Make && data.Model) {
    //       console.log(`Camera Make: ${data.Make}, Model: ${data.Model}`);
    //       setUploadType('camera');
    //     } else {
    //       console.log("No camera information found. Image may not have been taken with a camera.");
    //       setUploadType('Uploaded from gallery');
    //     }
    //     if (data.Software) {
    //       console.log(`Edited with: ${data.Software}`);
    //     } else {
    //       console.log("No editing software information found.");
    //     }
    //   };

    const cancelImageUpload = e => {
        e.preventDefault();
        setNewData(prev => ({...prev, 'image': null}));
        setPreview(null);
        setUploadType('');
    }
    return (
        <>
            {/* {uploadType} */}
            {/* <pre>{JSON.stringify(exifData)}</pre> */}
            {/* {false && <CameraCapture  setNewData={setNewData} setPreview={setPreview} preview={preview} />} */}
        <div style={{minWidth: "200px", minHeight: "200px"}} className="relative border border-gray-300 flex items-center justify-center w-full h-full">
            {image !== null ? 
            <img alt="Proof" src={preview}  className="object-scale-down h-full drop-shadow-md rounded m-auto" /> :
            <CameraCapture  setNewData={setNewData} setPreview={setPreview} preview={preview}  isStartCamera={isStartCamera} setIsStartCamera={setIsStartCamera} />
            // <input 
            //     type="file"
            //     accept="image/*"
            //     className={`
            //     w-full flex flex-col justify-center items-center 
            //     file:rounded-full file:border-none file:px-2 file:bg-gray-200 file:text-gray-500
            //     `}
            //     onChange={e => handleImageUpload(e)} 
            // />
            }
            {image !== null && <BaseHoveringCancel onClick={e => cancelImageUpload(e)} />}
        </div>
        </>
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


const CameraCapture = ({setNewData, setPreview, preview, isStartCamera, setIsStartCamera}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
  
    useEffect(() => {
      const startVideo = async () => {
        if (isStartCamera) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: isStartCamera });
            console.log(preview);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              await videoRef.current.play();
            }
          } catch (err) {
            console.error("Error accessing camera: ", err);
          }
        }
      };
  
      startVideo();
  
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }, [isStartCamera]);
  
    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const image = canvasRef.current.toDataURL('image/png');
        setCapturedImage(image);
  
        // Convert the data URL to a File object
        const imageFile = dataURLtoFile(image, 'captured-image.png');
        setNewData(prev => ({...prev, 'image':imageFile}));
        setPreview(image);    // Produces preview
        console.log(imageFile);
      }
    };
  
    const dataURLtoBlob = (dataURL) => {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };
  
    const dataURLtoFile = (dataURL, filename) => {
      const blob = dataURLtoBlob(dataURL);
      return new File([blob], filename, { type: blob.type });
    };

    return (
      <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-start">
      {
        isStartCamera ? 
          <div className="flex flex-col items-center">
            <video ref={videoRef} style={{ width: '100%' }} autoPlay playsInline />
            <span className="flex flex-col justify-center items-center space-y-2 p-1">
              <FontAwesomeIcon onClick={() => captureImage()} icon={faCameraAlt} className="p-5 rounded-full bg-gray-300 text-3xl font-light" />
              <span onClick={() => setIsStartCamera(!isStartCamera)} className="font-extralight"><FontAwesomeIcon icon={faMultiply} /> Close Camera</span>
            </span>
          </div>
          :
          <div onClick={() => setIsStartCamera(!isStartCamera)} className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
            <span><FontAwesomeIcon icon={faCameraAlt} className="p-5 rounded-full bg-gray-300 text-3xl font-light" /></span>
            <span onClick={() => setIsStartCamera(!isStartCamera)} className="font-extralight">Open Camera</span>
          </div>
          }
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {/* {capturedImage && (
            <div>
              <h3>Captured Image:</h3>
              <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
              <button onClick={uploadImage}>Upload Image</button>
            </div>
          )} */}
        </div>
    );
};

// const CameraCapture = ({setNewData, setPreview, preview}) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);
  
//     useEffect(() => {
//       const startVideo = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             await videoRef.current.play();
//           }
//         } catch (err) {
//           console.error("Error accessing camera: ", err);
//         }
//       };
  
//       startVideo();
  
//       // Clean up the video stream when the component unmounts
//       return () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//           const stream = videoRef.current.srcObject;
//           const tracks = stream.getTracks();
//           tracks.forEach(track => track.stop());
//         }
//       };
//     }, []);
  
//     const captureImage = () => {
//       if (videoRef.current && canvasRef.current) {
//         const context = canvasRef.current.getContext('2d');
//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;
//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const image = canvasRef.current.toDataURL('image/png');
//         setCapturedImage(image);
        
        // const imageFile = dataURLtoFile(image, 'captured-image.png');
        // setNewData(prev => ({...prev, 'image':imageFile}));
        // setPreview(image);    // Produces preview
        // console.log(imageFile);
//       }
//     };

//   const dataURLtoBlob = (dataURL) => {
//     const arr = dataURL.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
//   };

//   const dataURLtoFile = (dataURL, filename) => {
//     const blob = dataURLtoBlob(dataURL);
//     return new File([blob], filename, { type: blob.type });
//   };
  
//     return (
//       <div className="camera-capture">
//         {!preview && <video ref={videoRef} style={{ width: '100%' }} />}
//         <button onClick={captureImage}>Capture Image</button>
//         <canvas ref={canvasRef} style={{ display: 'none' }} />
//         {/* {capturedImage && (
//           <div>
//             <h3>Captured Image:</h3>
//             <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
//           </div>
//         )} */}
//       </div>
//     );
//   };

// const CameraCapture = () => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);
  
//     useEffect(() => {
//       // Request access to the camera
//       navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//           // Set the video source to the stream
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         })
//         .catch(err => {
//           console.error("Error accessing camera: ", err);
//         });
  
//       // Clean up the video stream when the component unmounts
//       return () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//           videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//         }
//       };
//     }, []);
  
//     const captureImage = () => {
//       const context = canvasRef.current.getContext('2d');
//       // Set the canvas size to the video dimensions
//       canvasRef.current.width = videoRef.current.videoWidth;
//       canvasRef.current.height = videoRef.current.videoHeight;
//       // Draw the current frame of the video onto the canvas
//       context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//       // Get the image data URL and set it as the captured image
//       setCapturedImage(canvasRef.current.toDataURL('image/png'));
//     };
  
//     return (
//       <div className="camera-capture">
//         <video ref={videoRef} style={{ width: '100%' }} />
//         <button onClick={captureImage}>Capture Image</button>
//         <canvas ref={canvasRef} style={{ display: 'none' }} />
//         {capturedImage && (
//           <div>
//             <h3>Captured Image:</h3>
//             <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
//           </div>
//         )}
//       </div>
//     );
//   };

