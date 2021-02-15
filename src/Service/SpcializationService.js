import axios from 'axios';

export function getspecializations() {
    return axios.post(process.env.REACT_APP_SERVER_URL + `/Specialization/getallspecialization`)
}

