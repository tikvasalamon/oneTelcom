import axios from 'axios'

let createPlan = (obj) => {
    return axios.post('http://localhost:8000/plans/createPlan',obj);
}

let getAllPlans = () => {
    return axios.get('http://localhost:8000/plans/allPlans');
}

let DAL = {
    createPlan : createPlan,
    getAllPlans: getAllPlans
}


export default DAL