//Service API CALL
import axios from 'axios';

//#region LOGIN API
export async function login(users) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Account/AdminLogin`, users)
}
//#endregion

//#region  State Apis
export  function GetAllStates() {
    return  axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetAll`)
}

export  function GetOneState(id) {
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

//#endregion

//#region  City Apis
export function GetAllCities(){
    return axios.get(process.env.REACT_APP_SERVER_URL + `/City/GetAll`);
}

export function AddCity(data) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/City/Add`,data,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}

export function EditCity(data){
    return axios.post(process.env.REACT_APP_SERVER_URL + `/City/Edit`,data,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}

export  function GetOneCity(id) {
    return  axios.get(process.env.REACT_APP_SERVER_URL + `/City/GetOne?id=${id}`)
}

export function DeleteCity(data)
{
    return axios.delete(process.env.REACT_APP_SERVER_URL + `/City/Delete?id=${data}`,{headers:{ 'Authorization': 'Bearer '+localStorage.getItem('AccessToken') }})
}
//#endregion

//#region Specialization Api

export function Getspecializations() {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Specialization/getallspecialization`)
}

export function Addspecialization(data) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Specialization/addsepcialization`,data,{'headers':headers})
}

export  function Getspecialization(id) {
    return  axios.get(process.env.REACT_APP_SERVER_URL + `/Specialization/getspecialization?id=${id}`)
}

export function Deletespecialization(id) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Specialization/deletespecialization?id=${id}`,null,{'headers':headers})
}

export function Editspecialization(specializationMaster_Id) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Specialization/updatesepcialization`,specializationMaster_Id,{'headers':headers})
}
//#endregion

//#region Degree Apis
export function GetDegrees() {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Degree/GetAllDegree`)
}

export function AddDegree(data) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Degree/AddDegree`,data,{'headers':headers})
}
export function GetDegree(id) {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Degree/GetOneDegree?id=${id}`)
}
export function DeleteDegree(id) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Degree/DeleteDegree?id=${id}`,null,{'headers':headers})
}
export function EditDegree(DegreeMaster_Id) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Degree/UpdateDegree`,DegreeMaster_Id,{'headers':headers})
}
//#endregion

//#region changepassword

export function changepassword(oldpassword,newpassword) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Comman/changepassword?oldpassword=${oldpassword}&&newpassword=${newpassword}`,null,{'headers':headers})
}
//#endregion

//#region Total Approval Request 
export function GetApprovalRequestCount() {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/ApprovalRequest/getapprovalrequests`)
}

export function getallapprovalrequest() {
   
    return axios.get(process.env.REACT_APP_SERVER_URL + `/ApprovalRequest/getapprovalrequests`)
}

export function getapprovalrequestprofile(id) {
   
    return axios.get(process.env.REACT_APP_SERVER_URL + `/ApprovalRequest/getapprovalrequestprofile?id=${id}`)
}

//#endregion