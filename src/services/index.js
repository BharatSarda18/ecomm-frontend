import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import useRedirectToLogin from "../layout/useRedirectToLogin";

const token = localStorage.getItem("token");


const Config = axios.create({

    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
Config.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error?.response?.status, typeof error?.response?.status, "error");
        if (error?.response?.status == 401) {
            localStorage.clear();
            const url = `${process.env.REACT_APP_FRONTEND_URL}login`;
            console.log(url, 'url');
            window.location.replace(url);
        }

        const updatedMessage = error?.response?.data?.message;
        toast.error(updatedMessage)
        return Promise.reject(error);
    }

);

export default Config;