//Services
import axios from 'axios';

export async function getalldoctors(){
   
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/Doctor/GetAll`);
}

export async function gettimeslot(id,date){
   
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/DoctorTimeSlot/gettimeslot?id=${id}&date=${date}`);
}
