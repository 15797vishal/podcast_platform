// https://www.youtube.com/watch?v=qgRoBaqhdZc
import './App.css';
 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import SignUpPage from './pages/SignUp';
import Profile from './pages/profile';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/Common/Privateroutes';
import CreatePodcast from './pages/CreatePodcast';
import PodcastPage from './pages/Podcasts';
import CreatePodcastForm from './components/StartaPodcast/CreatePodcastForm';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';
 
function App() { 
  const dispatch=useDispatch(); 

  useEffect(() => {
  const unSubscribeAuth = onAuthStateChanged(auth,(user) =>{
    if(user){ 
      const unsubscribeSnapshot=onSnapshot(
        doc(db,"users",user.uid),
       (userDoc) =>{
        if(userDoc.exists()){
          const userData =userDoc.data();
          dispatch(             
            setUser({
                name:userData.name,
                email:userData.email,
                uid:user.uid,
            })
          );
        }
       },
       (error) => {
        console.error("error fetching user data :",error);
       }
      );
      return ()=>{
        unsubscribeSnapshot();
      };
    }
  });
  return () =>{
    unSubscribeAuth();
  };
  }, [])
  return (
    <div className="App"> 
   <ToastContainer />
   <Router>
      <Routes>
        <Route  path="/" element={<SignUpPage/>}/> 

      <Route element={<PrivateRoutes />}>
      <Route  path="/profile" element={<Profile/>} /> 
  <Route path='/createpodcast' element={<CreatePodcastForm/>} />
  <Route  path="/podcasts" element={<PodcastPage/>} />  
  <Route path='/podcasts/:id' element={<PodcastDetailsPage/>}/>
  <Route path='/podcasts/:id/create-episode' element={< CreateAnEpisodePage/>}/>
        </Route> 
        
        
      </Routes> 
    </Router>  
 
   

    </div>
  );
}

export default App;
