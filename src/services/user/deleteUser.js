import axios from 'axios';
import { BASE_URL } from 'const';

export async function deleteUser(id) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.delete(`${BASE_URL}admin/deleteUser/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
