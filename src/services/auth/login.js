import axios from 'axios';
import { BASE_URL } from 'const';

export async function login(data) {
    return await axios.post(`${BASE_URL}account/authenticate`, data);
}
