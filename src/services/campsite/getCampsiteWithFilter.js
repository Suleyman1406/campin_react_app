import axios from 'axios';
import { BASE_URL } from 'const';

export async function getCampsiteWithFilter(data) {
    return await axios.get(
        `${BASE_URL}campsite/getFilteredCampsites?${
            data.cityName ? `cityName=${data.cityName}` : ''
        }&${data.startDate ? `startDate=${data.startDate}` : ''}&${
            data.enDate ? `enDate=${data.enDate}` : ''
        }`,
    );
}
