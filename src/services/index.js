import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const FetchToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

// Create an axios instance
const Config = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});


// Add a request interceptor to dynamically set the token for each request this should go to dev environment
const setAuthorizationHeader = (config) => {
    const token = FetchToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

Config.interceptors.request.use(
    (config) => setAuthorizationHeader(config),
    (error) => Promise.reject(error)
);

// Add response interceptors
Config.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error?.response?.data?.message || 'Something went wrong';

        if (error?.response?.status == 401) {
            localStorage.clear();
            const url = `${process.env.REACT_APP_FRONTEND_URL}login`;
            window.location.replace(url);
        }

        toast.error(errorMessage)
        return Promise.reject(error);
    }
);


export default Config;
