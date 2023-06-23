import axios from 'axios';
import { BASE_URL } from 'const';

export async function getFavoriteCampsites() {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.get(`${BASE_URL}favoriteCampsite/getFavoriteCampsites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
