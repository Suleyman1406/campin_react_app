import axios from 'axios';
import { BASE_URL } from 'const';

export async function addRoleToUser(userId, role) {
    const token = localStorage.getItem('jwt');
    return await axios.put(
        `${BASE_URL}admin/user/${userId}/addRole/${role}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
}
