//Service API CALL
import axios from 'axios';

export function login(users) {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/DoctorLogin`, users)
}

// export function register(users) {
//     return axios.post(process.env.REACT_APP_SERVER_URL + `/Account/DoctorLogin`, users)
