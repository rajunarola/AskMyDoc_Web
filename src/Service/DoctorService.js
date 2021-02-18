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