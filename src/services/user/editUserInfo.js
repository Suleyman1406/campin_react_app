import axios from 'axios';
import { BASE_URL } from 'const';

export async function editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return await axios.post(`${BASE_URL}userinfo/editUserInfo`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
