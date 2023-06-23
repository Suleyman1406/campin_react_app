import axios from 'axios';
import { BASE_URL } from 'const';

export async function getReservedCampsites() {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.get(`${BASE_URL}campsiteOwner/getReserevedCampsites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
