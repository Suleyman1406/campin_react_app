import axios from 'axios';
import { BASE_URL } from 'const';

export async function getCities() {
    return await axios.get(`${BASE_URL}city`);
}
