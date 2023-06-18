import axios from 'axios';
import { BASE_URL } from 'const';

export async function deleteCampsite(id) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.delete(`${BASE_URL}campsiteOwner/deleteCampsite?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
