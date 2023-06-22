import axios from 'axios';
import { BASE_URL } from 'const';

export async function createReservation(data) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.post(`${BASE_URL}rezervation/makeReservation`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
