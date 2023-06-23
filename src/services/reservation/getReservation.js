import axios from 'axios';
import { BASE_URL } from 'const';

export async function getReservations() {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.get(`${BASE_URL}rezervation/getUserReservedCampsite`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
