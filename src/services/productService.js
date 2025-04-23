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
    // Create a URLSearchParams object to build the query string
    const queryParams = new URLSearchParams();

    // Append filters to query params
    Object.keys(filter).forEach((key) => {
        const categoryValues = filter[key];
        if (categoryValues && categoryValues.length > 0) {
            queryParams.append(key, categoryValues.join(","));
        }
    });

    // Append sort parameters
    Object.keys(sort).forEach((key) => {
        if (sort[key]) {
            queryParams.append(key, sort[key]);
        }
    });

    // Append pagination parameters
    Object.keys(pagination).forEach((key) => {
        if (pagination[key] !== undefined && pagination[key] !== null) {
            queryParams.append(key, pagination[key]);
        }
    });

    // Add admin parameter if present
    if (admin) {
        queryParams.append("admin", "true");
    }

    // Convert the queryParams to a string
    const queryString = queryParams.toString();

    // Make the API request with the query string
    return Config.get(`/products?${queryString}`);
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

export const deleteProduct=async(product)=>{
    return Config.delete(`/products/${product?.id}`, product)
}