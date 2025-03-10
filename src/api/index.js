import axios from 'axios';
import { getAuthToken } from './auth.js';   // Function to get the auth token
import { setupInterceptors } from './interceptors.js';
// Set up interceptors to attach token

const api = axios.create({
    baseURL: "https://d5c1-152-52-228-70.ngrok-free.app",  // Base URL for your API
});

// Setting up interceptors for token management
setupInterceptors(api);

// Function to make requests
export const makeRequest = async (method, url, data = null) => {
    const authToken = getAuthToken();
    const headers = {
        'Authorization': authToken == null ? '' : `Bearer ${authToken}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await api({
            method,
            url,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};
