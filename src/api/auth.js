export const getAuthToken = () => {
    // You can fetch the token from localStorage or cookies
    return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
    // Store token in localStorage or a secure place
    localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
    // Clear the token from localStorage when logging out
    localStorage.removeItem('authToken');
};
