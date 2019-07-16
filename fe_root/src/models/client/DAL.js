import axios from 'axios'

let register = (obj) => {
    return axios.post('http://localhost:8000/clients/register',obj);
}

let login = (obj) => {
    return axios.post('http://localhost:8000/clients/login',obj);
}

let selectPlan = (obj) => {
    return axios.post('http://localhost:8000/clients/selectPlan',obj)
}

let DAL = {
    register : register,
    login: login,
    selectPlan: selectPlan
}


export default DAL