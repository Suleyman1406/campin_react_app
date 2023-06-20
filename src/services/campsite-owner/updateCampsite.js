import axios from 'axios';
import { BASE_URL } from 'const';

export async function updateCampsite(data) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.put(`${BASE_URL}campsiteOwner/updateCampsite`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
