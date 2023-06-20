import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../components/Common/Header';
import Button from '../components/Common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import Loader from '../components/Common/Loader';


function Profile() {
    const user =useSelector((state) => state.user.user);
    console.log("myuser is ", user);   
  if(!user){ 
    return < Loader/>
  } 
 const hanldeLogOut =()=>{
  signOut(auth)
  .then(() =>{ 
    toast.success("user logout ");
    // signout successful
  }).catch((error) =>{
    // an error happened 
    toast.error(error.message);
  });
 };

  return (
    <div>
    <Header />
    <div className='showdata'>
    <div>  <p className='head'>Name : </p>  {user.name}</div>
    <div> <p className='head'>Email : </p>  {user.email}</div>
    <div>  <p className='head'>Id  :  </p>  {user.uid}</div> 
    <Button  text={"Logout"}  onClick={hanldeLogOut}/>
    </div>
    </div>
  )
}

export default Profile;