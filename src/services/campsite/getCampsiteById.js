import axios from 'axios';
import { BASE_URL } from 'const';

export async function getCampsiteById(id) {
    return await axios.get(`${BASE_URL}campsite/getCampsiteById?id=${id}`);
}
