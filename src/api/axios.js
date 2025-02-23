import axios from 'axios';
// const BASE_URL = 'https://backendfornotesapp-1.onrender.com';
const BASE_URL = 'https://backend-for-notes-app.vercel.app';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});