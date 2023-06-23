import axios from 'axios';
import { BASE_URL } from 'const';

export async function removeFromFavoriteCampsite(campsiteId) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.delete(
        `${BASE_URL}favoriteCampsite/removeFavoriteCampsite?campsiteId=${campsiteId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
}
