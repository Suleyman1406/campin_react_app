import axios from 'axios';
import { BASE_URL } from 'const';

export async function uploadCampsiteImg(data) {
    const token = localStorage.getItem('jwt') ?? '';
    return await axios.post(`${BASE_URL}azureblobstorage/uploadFile`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
