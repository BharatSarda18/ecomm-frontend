import Config from "./index";

export const loginUser = async (loginInfo) => {
    return Config.post(`/auth/login`,loginInfo);
};

export const createUser = async (newUserInfo) => {
    return Config.post(`/auth/signup`,newUserInfo);
};

export const checkAuth=async()=>{
    return Config.get(`/auth/checkin`);
};

export const resetPasswordRequest = async (newPasswordInfo) => {
    return Config.post(`/auth/reset-password-request`,newPasswordInfo);
};

export const resetPassword = async (newPasswordInfo) => {
    return Config.post(`/auth/reset-password`,newPasswordInfo);
};

export const signOut = async () => {
    return Config.get(`/auth/logout`);
};


