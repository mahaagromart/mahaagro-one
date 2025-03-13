import axios from 'axios';
import { getAuthToken } from './auth.js';  
import { setupInterceptors } from './interceptors.js';


const api = axios.create({
  // baseURL: "http://192.168.0.102/api", 
     baseURL:"http://localhost:5136/",
});


setupInterceptors(api);

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
       console.log(error)
    }
};
