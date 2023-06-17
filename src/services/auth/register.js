import axios from 'axios';
import { BASE_URL } from 'const';

export async function register(data) {
    return await axios.post(`${BASE_URL}account/register`, data);
}
