import Config from "./index";

export const createOrder = async (order) => {
    return Config.post(`/order/`,order);
};

export const updateOrder = async (order) => {
    return Config.patch(`/order/${order?.id}`,order);
};

export const fetchAllOrders = async (sort, pagination) => {
    return Config.get(`/order?`);
};