import { toast } from 'react-toastify';

export function notifyError(message) {
    toast.error(truncate(message, 200), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
}

export function notifyAxiosError(error) {
    if (error.response) {
        console.error(error.response.status);
        console.error(error.response.headers);
        notifyError(error.response.data?.message || error.response.data || 'Error occured!');
    } else if (error.request && typeof error.request === 'string') {
        notifyError(error.request);
    } else {
        notifyError(error.message);
    }
}

export function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + '...' : str;
}
