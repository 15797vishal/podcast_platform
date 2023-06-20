import React, { useState } from 'react'
import InputComponent from '../../Common/input';
import Button from '../../Common/Button'; 
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUpForm() { 
    const [fullName, setFullName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword , setConfirmPassword]=useState(""); 
    const [loading,setLoading]=useState(false);
  

    const navigate=useNavigate();
  const dispatch=useDispatch();

    const handleSignUp = async ()=>{
        console.log("handling signup");
        setLoading(true);
        if(password==confirmPassword && password.length>=6 
          && fullName && email)
          {
        try{ ///crate user account 
          const userCredential=await createUserWithEmailAndPassword(auth,email,password);

          const user =userCredential.user;
          console.log("user is",user); 
          await setDoc(doc(db,"users",user.uid),
          {
            name:fullName,  
            email:user.email,
              uid:user.uid,
          }); 
          //dispathc save data in redux
          dispatch(setUser({
            name:fullName,
            email:user.email,
              uid:user.uid,
          })
          ); 
          toast.success("User has  been created !");
          setLoading(false);
          navigate("/profile");
        } 
        catch(e){
          console.log("error",e);
          toast.error(e.message);
          setLoading(false);
        }  
    }  
        else{
          // throw error 
          if(password != confirmPassword){
            toast.error("please make sure your password and confirm matches !");
          } 
          else if(password.length<6 ){
           toast.error( "password should be more than 6 digit!");
          }
          setLoading(false);
      } 
      
    };
        
  return (
    <>
     <InputComponent 
       state={fullName} 
       setState={setFullName} 
       placeholder="full name"  
        type="text" 
        required={true}
       />
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
       <InputComponent 
       state={confirmPassword} 
       setState={setConfirmPassword} 
       placeholder="Confirm Password"  
        type="password" 
        required={true}
       /> 
      <Button
       text={loading ?  "loading ..." :"SignUp"}
       onClick={handleSignUp}
        disabled={loading}  
       />
    </>
  )
}

export default SignUpForm