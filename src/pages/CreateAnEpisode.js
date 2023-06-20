import React, { useState } from 'react'
import Header from '../components/Common/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FileInput from '../components/Common/input/FileInput';
import InputComponent from '../components/Common/input';
import { toast } from 'react-toastify';
import Button from '../components/Common/Button';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';

function CreateAnEpisodePage() {
    const {id}=useParams();
    const [title, setTitle]=useState("");
    const [desc, setDesc]=useState("");
    const [audioFile , setAudioFile]=useState("");
    const [loading, setLoading]=useState(false);

    const navigate =useNavigate();  
    const dispatch =useDispatch(); 
    
  
    const audioFileHandle =(file)=>{
        setAudioFile(file);
    } 

    const  handlesubmit = async ()=>{
        setLoading(true);
        if(title,desc,audioFile,id){
            try{
                const audioRef=ref(
                    storage,
        `podcasts/episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes (audioRef,audioFile);
                const audioURL=await getDownloadURL(audioRef);
                const episodeData ={
                    title:title,
                    description:desc,
                    audioFile:audioURL,
                };
                await addDoc(
        collection(db,"podcasts",id,"episodes"),episodeData);
                toast.success("episode created successfully ");
                setLoading(false);
                navigate(`/podcasts/${id}`);
                setTitle("");
                setDesc("");
                setAudioFile("");
      
            }
            catch (e){
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            toast.error("All files should be there");
            setLoading(false);
        }
    };

  return (
    <div>
    <Header/>  
    <h1>Create an episode </h1>

    <InputComponent 
       state={title} 
       setState={setTitle} 
       placeholder="Title"  
        type="text" 
        required={true}
       />
       <InputComponent 
       state={desc} 
       setState={setDesc} 
       placeholder="Description"  
        type="text" 
        required={true}
       /> 
       <FileInput   
        accept={"audio/*"}
        id="audiofileInput"
        FileHandlefunction={audioFileHandle}
        text={"Upload Audio File Here"}
       />
      <Button   
       text={loading ?  "loading ..." :"Create New Episode"}
       onClick={handlesubmit}
        disabled={loading}  
       />
    </div>
  )
}

export default CreateAnEpisodePage