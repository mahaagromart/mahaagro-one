import axios from 'axios';
import { getAuthToken } from './auth.js';  
import { setupInterceptors } from './interceptors.js';

// API instance
const api = axios.create({

        baseURL: "https://api.mahaagro.org",
});

setupInterceptors(api);

export const makeRequest = async (method, url, data = null, headers = {}) => {
    const authToken = getAuthToken();
    const finalHeaders = {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        'Content-Type': 'application/json',
        ...headers,
    };

    try {
        const response = await api({
            method,
            url,
            data,
            headers: finalHeaders,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};