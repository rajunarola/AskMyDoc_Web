//Service API CALL
import axios from 'axios';

export function login(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/DoctorLogin`, users)
}

export async function UploadPhoto(formData) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/ProfilePhoto?type=1`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function UploadDocument(formData) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/ProfilePhoto?type=3`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function register(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/register`, users)
}

export function GetState() {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetAll`)
}

export async function GetCityByState(id) {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Account/getallcitiesbystate?stateid=` + id)
}

export function GetAllSpecilization() {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Specialization/getallspecialization`)
}

export function GetAllDegree() {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Degree/GetAllDegree`)
}

export function GetOneCity(id) {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Account/getallcitiesbystate?stateid=${id}`)
}

export async function sendmail(email) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Comman/sendmail?To=` + email);
}

export async function verifyemail(code, token) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/verifyemail?code=` + code, null, { headers: headers });
}
export async function checkemailavailability(email) {

    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Doctor/checkemailavailability?email=${email}`, null);
}
export async function getDoctorDetail() {
    console.log('{localStorage.getIte => ', localStorage.getItem('Token'));

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + `${localStorage.getItem('Token')}`
    }
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Doctor/GetOne?id=${localStorage.getItem('dcotorid')}`,
        {
            headers: headers
        })
}
export function ChangePassword(oldpassword, newpassword) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('Token')
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Comman/changepassword?oldpassword=${oldpassword}&&newpassword=${newpassword}`, null, { headers: headers })
}


export async function ResetPasswordService(data) {

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('ResetPasswordToken')
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/resetpassword`, data, { headers: headers });
}


export async function AddDoctorTimeSlot(data){
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/DoctorTimeSlot/addTimeSlot`, data, { headers: headers });
}

export async function getDoctorAllTimeSlot(){
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorTimeSlot/getDoctorTimeSlotList`,{ headers: headers });
}