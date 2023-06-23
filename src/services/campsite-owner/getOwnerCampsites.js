import axios from 'axios';
import { BASE_URL } from 'const';

export async function getOwnerCampsites() {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.get(`${BASE_URL}campsiteOwner/getOwnerCampsites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
