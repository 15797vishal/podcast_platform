import React, { useState } from 'react'
import SignUpForm from '../components/SignUpComponent/SignUpForm.js';
import Header from '../components/Common/Header';
import LoginForm from '../components/SignUpComponent/LoginForm/index.js';

function SignUpPage() {
const[flag,setflag]=useState(false);

  return (
    <div>  
  <Header />
       <div className='wrapperdiv'> 
       {!flag ? <h1>SignUp</h1> : <h1>Login</h1>}
       {!flag ?  <SignUpForm /> :<LoginForm/>}
       {!flag ?  ( 
        <p style={{cursor:"pointer" ,fontsize:"50px", width:"100%"}} 
        onClick={() => setflag(!flag)}>
       Already have an account . Login Here</p> ):
        ( <p style={{cursor:"pointer" ,fontsize:"50px", width:"100%"}}
        onClick={() => setflag(!flag)}>
        Don't have an account  ? click here to SignUp</p>
         )}
    
       </div>
    </div>
  )
}

export default SignUpPage;