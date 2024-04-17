import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import useRedirectToLogin from "../layout/useRedirectToLogin";

const token=localStorage.getItem("token");


const Config = axios.create({
    baseURL: `http://localhost:8080/`,

    headers: {
        Authorization: `Bearer ${token}`,
    },
})
Config.interceptors.response.use(
    (response) => {
       return response;
    },
    (error)=>{
        console.log(error?.response?.status,"error");
        if(error?.response?.status==401){
            useRedirectToLogin();
        }
       
        const updatedMessage = error?.response?.data?.message;
        toast.error(updatedMessage)
        return Promise.reject(error);
    }

);

export default Config;