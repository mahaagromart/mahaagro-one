export const parseResponse = (response) => {
    return response?.data || null;
  };
  
  export const handleError = (error) => {
    if (error.response) {
      return error.response.data || error.message;
    } else {
      return error.message;
    }
  };
  