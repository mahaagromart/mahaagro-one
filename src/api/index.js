import axios from 'axios';
import { getAuthToken } from './auth.js';   
import { setupInterceptors } from './interceptors.js';

// API instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API ,
});

// Set up interceptors for token management
setupInterceptors(api);

// Function to make requests

export const makeRequest = async (method, url, data = null, headers = {}) => {
    const authToken = getAuthToken();
    const finalHeaders = {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        'Content-Type': 'application/json',
        ...headers, // Merge additional headers
    };

    try {
        const response = await api({
            method,
            url,
            data,
            headers: finalHeaders, // Ensure headers are passed here
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data?.message || JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            throw new Error("No response received from server. Please check your connection.");
        } else {
            throw new Error(`Request error: ${error.message}`);
        }
    }
};
