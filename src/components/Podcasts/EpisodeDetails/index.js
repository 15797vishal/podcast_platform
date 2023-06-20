 import React from 'react'
import Button from '../../Common/Button'
 import "./style.css";
 function EpisodeDetails({index,title,description,audioFile,onClick}) {
   return (
     <div className=' wrapperdiv episoedisp'>
     <h1 >{index}.{title}</h1>
     <p >{description}</p>
     <Button   className="custombtn episode-btn"
     style="width:20%"
     text={"Play Episode"} onClick={onClick(audioFile)} />
     </div>
   )
 }
 
 export default EpisodeDetails