import React from 'react'
import "./style.css";
function Button({text,onClick,disabled,width}) {
  return (
    <div onClick={onClick} className='custombtn' 
    disabled={disabled}  
    style={{width:width}}> 
    
    {text}  
   
    </div>
  )
}

export default Button