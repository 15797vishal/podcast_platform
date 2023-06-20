import userReducer  from "./slices/userSlice";

 import  {configureStore} from "@reduxjs/toolkit"; 
 import podcastReducer  from "./slices/podcastSlice";
export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastReducer,
    },
});