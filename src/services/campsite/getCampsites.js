import axios from 'axios';
import { BASE_URL } from 'const';

export async function getCampsites() {
    return await axios.get(`${BASE_URL}campsite/getCampsites`);
}
