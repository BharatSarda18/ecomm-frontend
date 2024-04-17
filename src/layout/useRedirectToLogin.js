import React from "react";
import { useNavigate } from "react-router-dom";

// Custom hook for navigation
const useRedirectToLogin = () => {
    const navigate = useNavigate();
    const redirectToLogin = () => {
        localStorage.clear();
        navigate("/login");
    };
    return redirectToLogin;
};

export default useRedirectToLogin;
