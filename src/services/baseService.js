import Config from "./index";

export const getAxiosBaseService = async (url, params = {}) => {
    return Config.get(url, { params });
};

export const postAxiosBaseService = async (url, data) => {
    return (await Config.post(url, data));
};

export const deleteAxiosBaseService = async (url,data) => {
    return Config.delete(url,data);
};