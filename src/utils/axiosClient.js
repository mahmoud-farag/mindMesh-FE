import Axios from 'axios';
import { BASE_URL } from './apiConfig';


/**
 * Force logout and redirect to login page
 * Used when token expires or authentication fails
 */
function forceLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');

  // Using window.location ensures a full page reload, clearing any stale React state
  window.location.href = '/login';
}


const axiosClient = Axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
   
    // Silently ignore cancelled requests
    if (Axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Get error message from response
    const errorMessage = error.response?.data?.message || error.message || '';
    const statusCode = error.response?.status;

    // Check for token expiration - handle both message and 401 status
    const isTokenExpired =
      errorMessage.toLowerCase().includes('token has expired') ||
      errorMessage.toLowerCase().includes('please login again') ||
      errorMessage.toLowerCase().includes('invalid token') ||
      errorMessage.toLowerCase().includes('jwt expired');

    if (isTokenExpired || statusCode === 401) {
      forceLogout();
      // Return a rejected promise that won't trigger other error handlers
      return Promise.reject(new Error('Session expired. Redirecting to login...'));
    }

    return Promise.reject(error);
  }
);

export default axiosClient;