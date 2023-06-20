// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from 'firebase/firestore';
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Eaov8CvJZ5md5IHtOL6Q8rWdWLaitm4",
  authDomain: "podcast-apps-react.firebaseapp.com",
  projectId: "podcast-apps-react",
  storageBucket: "podcast-apps-react.appspot.com",
  messagingSenderId: "223418121904",
  appId: "1:223418121904:web:50ccb1f85433614dfe0575",
  measurementId: "G-PM239S3PJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
   const storage=getStorage(app);
const auth=getAuth(app);
 
export  {auth,storage,db} ;

