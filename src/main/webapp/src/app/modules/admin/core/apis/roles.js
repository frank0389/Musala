import axios from "axios";

const getRoles = () => {
    return  axios.get('/api/admin/roles');
};

const rolesApi = {
    getRoles
};

export default rolesApi;