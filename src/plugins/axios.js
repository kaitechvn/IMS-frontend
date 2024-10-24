import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('access_token');
if (token != null) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
