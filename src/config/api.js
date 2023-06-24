import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://1bkchtc9oh.execute-api.us-east-1.amazonaws.com/dev/',
    headers: {
        Accept: 'application/json',
        'Content-Type': '*',
    },
});
