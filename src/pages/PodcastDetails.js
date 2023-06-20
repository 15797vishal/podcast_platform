import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/Common/Button';
import EpisodeDetails from '../components/Podcasts/EpisodeDetails';
import Audioplayer from '../components/Podcasts/AudioPlayer';
function PodcastDetailsPage() { 
    const{id}=useParams(); 
    console.log(id);
    const[podcast,setPodcast]=useState({});
    const navigate=useNavigate();
    const[episode,setEpisodes]=useState([]);
    const [playingFile,setPlayingFile]=useState("");

    console.log("ID",id);
    useEffect(() => {
    getdata();
    }, [id]);

     const getdata= async()=>{
        try{
            const docRef=doc(db,"podcasts",id);
        const docSnap =await getDoc (docRef);

        if(docSnap.exists()){
            console.log("document data", docSnap.data());
            setPodcast({id:id, ...docSnap.data() });
        }
        else{
            console.log("no such podcasts");
            toast.error("no such podcasts ");
            navigate("/podcasts");
        }
        } catch(e){
            toast.error("something wrong",e.message);
        }
     };

     useEffect(() => {
      const unsubscribe=onSnapshot(
        query(collection(db,"podcasts",id,"episodes")),
        (QuerySnapshot)=>{
            const episodeData =[];
           QuerySnapshot.forEach((doc) =>{
            episodeData.push({id: doc.id, ...doc.data()});
           });
            setEpisodes(episodeData);
        }, 
        (error)=>{
            console.error("error fetching episodes ",error);
        }

      )
      return ()=>{
        unsubscribe();
      }
     }, [id])

  return (
    <div> 
    <Header />   
    <div className='wrapperdiv'>
    {podcast.id && (  
        <>
       <div style={{
        display:"flex",
        justifyContent:"right",
        alignItems:"right",
        width:"100%", 
    
       }}>

       <h1 className='headpodcast' >{podcast.title}</h1> 
       {podcast.createdBy == auth.currentUser.uid && ( 

       <Button
        sytle={{width:"250px !important", margin:0,}} 
       className="custombtn episodebtn"
        text={"Create Episode"}
        onClick={() => {
            navigate(`/podcasts/${id}/create-episode`)
        }}   
       /> )}
       
       
       </div>
       <div className='bannerwrap'> 
       <img src={podcast.bannerImage}/></div>
       <p className='podcastDesc'> Description :{podcast.description}</p>
       <h1 className='episodes'>Episodes : </h1>
       {episode.length>0 ?(  
        <>
        {episode.map((episode,index) =>{
        return (
            <EpisodeDetails
            key={index}
            index={index + 1}
            title={episode.title}
            description={episode.description}
            audioFile={episode.audioFile}
            onClick={(file) => setPlayingFile(file)} 
            />
        );
       })} 
       </>
       ) : ( <p>not episode found </p>)}
       </>
     )}
    </div> 
    {   playingFile && (
    <Audioplayer  audioSrc={playingFile} 
        image={podcast.displayImage}
    />  
    )}
    </div>
  )
}

export default PodcastDetailsPage