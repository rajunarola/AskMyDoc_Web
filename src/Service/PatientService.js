//Services
import axios from 'axios';

export async function getalldoctors() {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Doctor/GetAll`);
}

export async function gettimeslot(id, date) {

    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorTimeSlot/gettimeslot?id=${id}&date=${date}`);
}
export async function UploadPhoto(formData) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Doctor/ProfilePhoto?type=2`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export async function Bookappointment(data) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Appointment/bookappointment`, data, null)
}
export async function varifypatientemail(code, token) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Appointment/patientemailverify?code=${code}`, null, { 'headers': headers })
}
export async function checkAppointmentDetail(token, appointmentid) {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Appointment/CheckAppointment?appointmentid=${appointmentid}`, null, { 'headers': headers })
}
export async function noobjectionaccept(patientid) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Appointment/noobjectionaccept?patientid=` + patientid, null)
}

export async function updateAppoinment(appointmentid, roomLink, CallerType, IsCall) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `/Appointment/UpdateApData?appointmentid=${appointmentid}&roomLink=${roomLink}&CallerType=${CallerType}&IsCall=${IsCall}`, null)
}

export async function updateEndCall(appointmentid, EndCallerType, IsCall) {
    return await axios.post(process.env.REACT_APP_SERVER_URL + `Appointment/UpdateEndCall?appointmentid=${appointmentid}&EndCallerType=${EndCallerType}&IsCall=${IsCall}`, null)
}

export async function GetScoketId(appointmentid, IsCall) {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Appointment/GetSocketId?appointmentid=${appointmentid}&IsCall=${IsCall}`, null)
}


