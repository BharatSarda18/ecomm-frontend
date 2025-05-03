import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productSlice";
import cartReducer from "../redux/cartSlice";
import orderReducer from "../redux/orderSlice";
import userReducer from "../redux/userSlice";

export const store=configureStore({
    reducer:{
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        user: userReducer,
    }
})