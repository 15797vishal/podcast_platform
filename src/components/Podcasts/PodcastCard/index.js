import React from 'react'
import "./style.css";
import { Link } from 'react-router-dom';
function PodcastCard({title,id,displayImage}) {
  return (
    <Link  to={`/podcasts/${id}`}>
    <div className='podcadcard'>
    <img className='dispImagePod' src={displayImage}></img>
    <p className='podcastTitle'>{title}</p>
    </div>

    </Link>
  )
}

export default PodcastCard