import axios from 'axios';
import { BASE_URL } from 'const';

export async function getCurrentUser(token) {
    return await axios.get(`${BASE_URL}userinfo/getUserInfo`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
