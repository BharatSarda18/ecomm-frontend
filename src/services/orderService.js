import Config from "./index";

export const createOrder = async (order) => {
    return Config.post(`/order/`,order);
};

export const updateOrder = async (order) => {
    return Config.patch(`/order/${order?.id}`,order);
};

export const fetchAllOrders = async (pagination) => {
    const queryParams = new URLSearchParams();
    Object.keys(pagination).forEach((key) => {
        if (pagination[key] !== undefined && pagination[key] !== null) {
            queryParams.append(key, pagination[key]);
        }
    });
    const queryString = queryParams.toString();
    return Config.get(`/order?${queryString}`);
};