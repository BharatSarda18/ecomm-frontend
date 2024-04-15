import Config from "./index";

export const fetchProductById = async (id) => {
    return Config.get(`/products/${id}`, {
        id: id
    });
};

export const createProduct = async (product) => {
    return Config.post(`/products/`, product);
};

export const fetchProductsByFilters = async (filter, sort, pagination, admin) => {
    let queryString = '';
    for (let key in filter) {
        const categoryValues = filter[key];
        if (categoryValues.length) {
            queryString += `${key}=${categoryValues}&`;
        }
    }
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
    }
    if (admin) {
        queryString += `admin=true`;
    }
    return Config.get(`/products?${queryString}`,);
};

export const fetchCategories = async () => {
    return Config.get(`/categories`);
};

export const fetchBrands = async () => {
    return Config.get(`/brand`);
};

export const updateProduct = async (update) => {
    return Config.patch(`/products/${update?.id}`, update);
};