import React, { useState } from 'react'
import "./style.css";

function FileInput({accept,id,FileHandlefunction,text}) {
    const [fileselected, setfileselected]=useState("");
    const onChange =(e)=>{
console.log(e.target.files); 
setfileselected(e.target.files[0].name);
FileHandlefunction(e.target.files[0]);
    };

  return (
    <div className='custominput custom'>
      
    <label htmlFor={id}  
    className={`custom input ${!fileselected ?"input-label" :"active"}`} >
    {fileselected ?`File name > ${fileselected}< was selected`:
      text}
    </label>

    <input type='file' accept={accept} 
        id={id} style={{display:"none"}}
        onChange={onChange}
    />
    </div>
  )
}

export default FileInput