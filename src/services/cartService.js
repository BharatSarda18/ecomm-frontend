import Config from "./index";

export const addToCart = async (cartInfo) => {
    return Config.post(`/cart`,cartInfo);
};

export const fetchItemsByUserId = async () => {
    return Config.get(`/cart`);
};

export const updateCart = async (update) => {
    return Config.patch(`/cart/${update?.id}`,{"quantity":update.quantity}, {
        id: update.id
    });
};

export const deleteItemFromCart = async (itemId) => {
    return Config.delete(`/cart/${itemId}`);
};

export const resetCart = async () => {
    return Config.get(`/cart/reset`);
};

