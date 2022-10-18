import axios from "axios";

const createGateway= (gateway) => {
    return axios.post("/api/admin/gateways",gateway);
}

const updateGateway =  (gateway) =>  {
    return  axios.put("/api/admin/gateways",gateway);
};

const deleteGateway =(id) => {
    return axios.delete("/api/admin/gateways/"+id);
}

const getGateways = (fieldName,fieldValue,page,size,sort) => {
     return  axios.get('/api/admin/gateways?fieldName='+fieldName+'&fieldValue='+fieldValue+'&page='+page+'&size='+size+'&sort='+sort);

}

const getGateway = (id) => {
    return axios.get('/api/admin/gateways/'+id);
}

const gatewayApi = {
    createGateway,
    updateGateway,
    deleteGateway,
    getGateways,
    getGateway
};

export default gatewayApi;