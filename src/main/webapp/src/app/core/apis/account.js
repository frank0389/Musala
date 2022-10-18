import axios from "axios";

const account=  () =>  {
    return  axios.get("/api/account");
};

const update = (account) => {
    return axios.post('/api/account',account);
}

const changePassword = (pwd) => {
    return axios.post("api/account/change-password",pwd);
}

const accountApi = {
    account,
    update,
    changePassword
};

export default accountApi;