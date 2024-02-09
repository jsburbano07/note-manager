import axios from 'axios';
import { persistor, store } from './store/store';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

Axios.interceptors.request.use(
  (config) => {
    const token = (store.getState().auth.token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      await persistor.purge();
    }
    return Promise.reject(error);
  }
);

export default Axios;
