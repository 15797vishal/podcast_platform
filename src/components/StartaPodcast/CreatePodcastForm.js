import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Common/input";
import { toast } from "react-toastify";
import Button from '../Common/Button';
import FileInput from "../Common/input/FileInput";
import "./index.css";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Header from "../Common/Header";

function CreatePodcastForm() {
  const [title, setTitle] = useState(""); 
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBanerImage] = useState();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleSubmit = async() => {
    if (title && desc && displayImage && bannerImage) { 
      setLoading(true);
      // uplod files > get download links
      // 2 create a new doc in a new collection call podcast
      // save this podcast episode states in our podcast
    try{

      const bannerImageRef=ref(storage,
        `podcasts/${auth.currentUser.uid}/${Date.now()}` );
       await uploadBytes(bannerImageRef,bannerImage);
        toast.success("file uploaded ");
  const bannerImageUrl=await getDownloadURL(bannerImageRef);
 
  const displayImageRef=ref(storage,
    `podcasts/${auth.currentUser.uid}/${Date.now()}` );
   await uploadBytes(displayImageRef,bannerImage); 

   const dispalyImageUrl=await getDownloadURL(displayImageRef);
    const podcastData={
      title:title,  
      description:desc,
      bannerImage:bannerImageUrl,
      displayImage: dispalyImageUrl,
      createdBy:auth.currentUser.uid,
    };  
    const docRef =await addDoc(collection(db, "podcasts"),podcastData); 
    setTitle("");
    setDesc("");
    setBanerImage(null);
    setDisplayImage(null);
    toast.success("podcast created !");
    setLoading(false);
    }catch(e){
      toast.error(e.message);
      console.log("my error is",e);
      setLoading(false);
    }
    
  } 
    else {
      toast.error(" oops! something is missing  ");
    }
    
  }; 
  const DisplayImageFileHandlefunction = (file) => {
    setDisplayImage(file);
  };

  const BannerImageFileHandlefunction = (file) => {
    setBanerImage(file);
  };
  return (
    < div className="podcast">
    <Header /> 
    <h3 className="creatpodhead">  Create a Podcast</h3>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title "
        type="text"
        required={true}
        text={"Display Image Upload"}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
        text={"Banner Image Upload"}
      />

      <FileInput
      className="custominput"
        accept={"image/*"}
        id="display-image-input"
        FileHandlefunction={DisplayImageFileHandlefunction}
        text={"display image upload"}
      /> 

      <FileInput
      className="custominput"
        accept={"image/*"}
        id="Banner-image-Input"
        FileHandlefunction={BannerImageFileHandlefunction}
        text={"banner image upload "}
      />

      <Button 
      className="createbtn"
        text={Loading ? "loading ..." : "create a podcast"}
        disabled={Loading}
        onClick={handleSubmit}
        
      />
    </div>
  );
}

export default CreatePodcastForm;
