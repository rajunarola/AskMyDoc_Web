//Service API CALL
import axios from 'axios';

export function login(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/AdminLogin`, users)
}

export  function GetAllStates() {
    return  axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetAll`,)
}

export function AddState(data) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/State/Add`,data,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}