import React, { useState } from 'react'
import InputComponent from '../../Common/input';
import Button from '../../Common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

function LoginForm() { 
    
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[loading,setLoading]=useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin = async ()=>{
        console.log("handling login..");
        setLoading(true);
      if(email  &&  password){
        try{ ///crate user account 
          const userCredential=await 
          createUserWithEmailAndPassword(
            auth, email,password
          );
          const user =userCredential.user;
          // console.log("user is",user); 
        const userDoc= await setDoc(doc(db,"users",user.uid));
        const userData=userDoc.data();
        console.log("userData is",userData);

          dispatch(setUser({
            name:userData.name,
            email:user.email,
              uid:user.uid,
          })
          );
          toast.success("Login is successful !")
          setLoading(false);
          navigate("/profile");
        } 
        catch(error){
          console.log("error",error);
          setLoading(false);
          toast.success(error.message);
        }  
    } 
        else{
    toast.error("make sure Email and Password are not empty !");
    setLoading(false);
         }
      }
     
  return (
    <div> 
     
       <InputComponent 
       state={email} 
       setState={setEmail} 
       placeholder="Enter Email"  
        type="text" 
        required={true}
       /> 
       <InputComponent 
       state={password} 
       setState={setPassword} 
       placeholder="Password"  
        type="password" 
        required={true}
       /> 
       
      <Button 
      text={loading ? "loading .. please wait" : "Login"} 
       onClick={handleLogin}
        disabled={loading}

      />
    </div>
  )
}

export default LoginForm ;