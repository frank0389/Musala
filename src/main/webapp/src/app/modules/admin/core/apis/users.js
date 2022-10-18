import axios from "axios";

const createUser = (user) => {
    return axios.post("/api/admin/users",user);
}

const updateUser =  (user) =>  {
    return  axios.put("/api/admin/users",user);
};

const deleteUser =(userName) => {
    return axios.delete("/api/admin/users/"+userName);
}

const getUsers = (fieldName,fieldValue,page,size,sort) => {
     return  axios.get('/api/admin/users?fieldName='+fieldName+'&fieldValue='+fieldValue+'&page='+page+'&size='+size+'&sort='+sort);

}

const getUser = (userName) => {
    return axios.get('/api/admin/users/'+userName);
}

const userApi = {
    createUser,
    updateUser,
    getUser,
    getUsers,
    deleteUser
};

export default userApi;