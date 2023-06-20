import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import { useDispatch, useSelector } from 'react-redux';
import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase'; 
import{setPodcasts} from "../slices/podcastSlice";
import PodcastCard from '../components/Podcasts/PodcastCard';
import InputComponent from '../components/Common/input';
import { legacy_createStore } from '@reduxjs/toolkit';

function PodcastPage() { 
  const dispatch=useDispatch();
  const podcasts =useSelector((state) =>state.podcasts.podcasts); 
  const [search,setSearch]=useState("");


  useEffect(() => {
  const unSubscribe =onSnapshot(
    query(collection(db,"podcasts")),
    (QuerySnapshot)=> {
      const podcastsData= [];
QuerySnapshot.forEach((doc) =>{
  podcastsData.push({id:doc.id,...doc.data()});
});
dispatch(setPodcasts(podcastsData));    
    },
    (error) => {
      console.error("Error fetching podcasts",error);
    }  
  ); 
    return () =>{
      unSubscribe();
    };
  }, [dispatch]);
   console.log(podcasts); 

   var filterPodcast =podcasts.filter((item) =>item.title.toLowerCase().includes(search.toLowerCase()));
// console.log(filterPodcast,"get data");

  return ( 
    <div>    
    <Header />
    <div className='wrapperdiv'>
    <h1> Discover Podcast </h1>  
    <InputComponent 
       state={search} 
       setState={setSearch} 
       placeholder="Search by title"     
        type="text" 
  
       /> 
    {filterPodcast.length >0 ? (
      <div className='podcastFlex'>
    {filterPodcast.map((item) =>{
      return <PodcastCard  
      key={item.id}
      id={item.id}
      title={item.title}
      displayImage={item.displayImage}/>
        })}  </div>            
        ) : (
      <p>{search ? "No podcast found ": " No Podcast "}</p> )}
    </div>
    </div>
  )
}

export default PodcastPage;