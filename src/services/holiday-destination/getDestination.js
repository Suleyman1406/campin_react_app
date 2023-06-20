import axios from 'axios';
import { BASE_URL } from 'const';

export async function getHolidayDestination() {
    return await axios.get(`${BASE_URL}HolidayDestination`);
}
