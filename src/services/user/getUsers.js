import axios from 'axios';
import { BASE_URL } from 'const';

export async function getUsers() {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.get(`${BASE_URL}Admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
