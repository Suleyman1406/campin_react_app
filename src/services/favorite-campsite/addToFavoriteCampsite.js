import axios from 'axios';
import { BASE_URL } from 'const';

export async function addToFavoriteCampsite(campsiteId) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.post(
        `${BASE_URL}favoriteCampsite/addFavoriteCampsite?campsiteId=${campsiteId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
}
