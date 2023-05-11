import jwtDecode from 'jwt-decode';

export const BASE_URL = "http://localhost:3002/api/";

export let checkLogin = (response)=> {
    //get token
 let token = localStorage.getItem("oauth_token");
    if(token){
       // decode token
       try{
        // return token
          return jwtDecode(token);
       } catch(error){
        //return null
              return null;
       }
    } else {
        return null;
    }
};

