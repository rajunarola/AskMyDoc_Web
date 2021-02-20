//Service API CALL
import axios from 'axios';

export function login(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/DoctorLogin`, users)
}

export async function UploadPhoto(formData) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/ProfilePhoto?type=1`,  formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function UploadDocument(formData) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/ProfilePhoto?type=3`,  formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function register(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/register`, users)
}

export function GetState(){
    return axios.get(process.env.REACT_APP_SERVER_URL+`/State/GetAll`)
}

export async function GetCityByState(id){
    return await axios.get(process.env.REACT_APP_SERVER_URL+`/Account/getallcitiesbystate?stateid=`+id)
}

export function GetAllSpecilization(){
    return axios.get(process.env.REACT_APP_SERVER_URL+`/Specialization/getallspecialization`)
}

export function GetAllDegree(){
    return axios.get(process.env.REACT_APP_SERVER_URL+`/Degree/GetAllDegree`)
}

export function GetOneCity(id){
    return axios.get(process.env.REACT_APP_SERVER_URL + `/Account/getallcitiesbystate?stateid=${id}`)
}

export async function sendmail(email){
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Comman/sendmail?To=`+email);
}

export async function verifyemail(code,token)
{
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token 
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/verifyemail?code=`+code ,null, { headers: headers});
}
export async function checkemailavailability(email){
   
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Doctor/checkemailavailability?email=${email}`,null);
}