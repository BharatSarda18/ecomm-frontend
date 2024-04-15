import Config from "./index";

export const fetchLoggedInUserOrders = async () => {
    return Config.get(`/order/own/`);
};

export const fetchLoggedInUser = async () => {
    return Config.get(`/users/own`);
};

export const updateUser = async (update) => {
    return Config.patch(`/users/${update.id}`,update);
};

