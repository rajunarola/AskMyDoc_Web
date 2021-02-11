//Service API CALL
import axios from 'axios';

export function login(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/AdminLogin`, users)
}

export async function GetAllStates() {
    return await axios.get(process.env.REACT_APP_SERVER_URL + `/State/GetAll`,)
}