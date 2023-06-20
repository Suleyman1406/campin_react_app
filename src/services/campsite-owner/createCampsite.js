import axios from 'axios';
import { BASE_URL } from 'const';

export async function createCampsite(data) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.post(`${BASE_URL}campsiteOwner/createCampsite`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
