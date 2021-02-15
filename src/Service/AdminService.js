//Service API CALL
import axios from 'axios';

export function login(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/AdminLogin`, users)
}

export  function GetAllStates() {
    return  axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetAll`)
}

export  function GetOne(id) {
    return  axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetOne?id=${id}`)
}

export function AddState(data) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/State/Add`,data,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}

export function EditState(data) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/State/Edit`,data,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}

export function DeleteState(data)
{
    return axios.delete(process.env.REACT_APP_SERVER_URL + `/State/Delete?id=${data}`,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}

export function GetAllCities(){
    return axios.get(process.env.REACT_APP_SERVER_URL + `/City/GetAll`);
}

export function AddCity(data) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/City/Add`,data,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}