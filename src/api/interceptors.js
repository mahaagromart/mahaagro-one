// export const setupInterceptors = (apiInstance) => {
//     apiInstance.interceptors.request.use(
//       (config) => {
//         // Add the auth token to every request
//         const token = localStorage.getItem('authToken');
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => {
//         // Handle request errors
//         return Promise.reject(error);
//       }
//     );
  
//     apiInstance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         // Handle errors globally (e.g., token expiration, etc.)
//         if (error.response && error.response.status === 401) {
//           // Token expired or unauthorized
//           clearAuthToken();
//           // Redirect to login or show message
//         }
//         return Promise.reject(error);
//       }
//     );
//   };
  // src/api/interceptors.js

import { getAuthToken, clearAuthToken } from './auth';

export const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        clearAuthToken(); // ✅ Now properly imported
   
      }
      return Promise.reject(error);
    }
  );
};
