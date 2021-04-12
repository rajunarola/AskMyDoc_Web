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

export async function GetState() {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetAll`)
}

export async function GetCityByState(id) {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Account/getallcitiesbystate?stateid=` + id)
}

export async function GetAllSpecilization() {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Specialization/getallspecialization`)
}

export async function GetAllDegree() {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Degree/GetAllDegree`)
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
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + `${localStorage.getItem('Token')}`
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Doctor/GetOne?id=${localStorage.getItem('dcotorid')}`,
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

export async function ResetPasswordService(data, token) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token//localStorage.getItem('ResetPasswordToken')
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/resetpassword`, data, { headers: headers });
}

export async function getAllDoctorDegree() {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorDegree/getalldocotordegree`, { headers: headers })
}


export async function AddDoctorTimeSlot(data) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/DoctorTimeSlot/addTimeSlot`, data, { headers: headers });
}

export async function getDoctorAllTimeSlot() {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorTimeSlot/getDoctorTimeSlotList`, { headers: headers });
}
export function EditData(data) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/Edit`, data, { headers: headers });
}

export async function doctorSpecialization() {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorSpecialization/getalldocotorspecialization`, { headers: headers })
}

export async function getDoctorAppointment() {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Appointment/appointmentlist`, { headers: headers });
}
export async function GetPatientList() {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Appointment/patienthistorylist`, { headers: headers })
}
export async function GetDoctorDashboardData() {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorDashboard/getdashboarddata`, { headers: headers })
}
export function updateDoctorDegree(data) {//fgdgdgdfgdfgdf
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/Edit`, data, { headers: headers })
}
export function cancleaapointment(id) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
    }
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Appointment/cancelappointment?id=` + id, null, { headers: headers })
}
