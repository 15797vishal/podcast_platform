import React, { useEffect, useRef, useState } from 'react'
import "./style.css";
import {FaPause, FaPlay, FaVolumeDown, FaVolumeUp} from "react-icons/fa";
function Audioplayer({audioSrc, image}) {
  const audioRef =useRef(); 
  const [duration, setDuration]=useState(0);
  const[currentTime,setCurrentTime]=useState(0);
  const[volume,setVolume]=useState(1);
  const[mute,setMute]=useState(false);
  const[isPlaying, setIsPlaying]=useState(false);


const handleDuration =(e) =>{
  setCurrentTime(e.target.value);
  audioRef.current.currentTime =e.target.value;
};
 
const toggleplay =()=>{
  if(isPlaying){
    setIsPlaying(false)
  }
  else{
    setIsPlaying(true);
  }
}
const toggleMute =()=>{
  if(mute){
    setMute(false)
  }
  else{
    setMute(true);
  }
}; 
const handleVolume=(e)=>{
setVolume(e.target.value);
audioRef.current.volume=e.target.value;
} 
const formatTime=(time) =>{
  const minutes=Math.floor(time/60);
  const seconds=Math.floor(time % 60);
   return `${minutes} : ${seconds <10 ? "0" : ""}${seconds}`; 
}
 

useEffect(() => {
const audio =audioRef.current;
audio.addEventListener("timeupdate",handletimeUpdate);
audio.addEventListener("LoadedData",handleLoadedMetaData);
audio.addEventListener("ended",handleEnded);
 return()=>{
  audio.addEventListener("timeupdate",handletimeUpdate);
audio.addEventListener("LoadedData",handleLoadedMetaData);
audio.addEventListener("ended",handleEnded);
 };
}, []); 

const handletimeUpdate =()=>{
  setCurrentTime( audioRef.current.currentTime);
}
const handleLoadedMetaData =()=>{
  setDuration(audioRef.current.duration);
} 
const handleEnded =()=>{
  setCurrentTime(0);
  setIsPlaying(false);
}

useEffect(() => {
 if(isPlaying){
  audioRef.current.play();
 } else{
  audioRef.current.pause();
 }
}, [isPlaying]) ;


useEffect(() => {  
 if(!mute){
  audioRef.current.volume = 1;
  setVolume(1);
 }
 else{
  audioRef.current.volume = 0;
  setVolume(0);
 }
}, [mute]);
 



  return (
   
    <div className='customAudioplayer'>
    <img src={image}  className='imgs'/>
    <audio  ref={audioRef}   src={audioSrc} />  
    <p onClick={toggleplay} className="pause" > 
    { isPlaying ? <FaPause/> :<FaPlay />}    </p>
    
    <div className='customAudioDura'>
      <p>{formatTime(currentTime)}</p>
      <input type='range'  max={duration}
      value={currentTime}
      onChange={handleDuration}  step={0.01}
      className='duration-range'
    />
      <p>{formatTime(duration-currentTime)}</p> 
      <p onClick={toggleMute}>{ !mute  ? <FaVolumeUp /> :<FaVolumeDown/> }</p>
       
      <input type='range' value={volume}
       onChange={handleVolume} 
       max={1}
       min={0} step={0.01}
      className='volume-range'
    />
    </div>
    
    </div> 
    
  )
}

export default Audioplayer ;