import axios from "axios";

 const auth =  (params) => {
       return  axios.post('/api/authenticate',params);
};

 const account=  () =>  {
       return  axios.get("/api/account");
};

 const authApi = {
     auth,
     account
 };

 export default authApi;