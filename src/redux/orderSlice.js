import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "../services/orderService";

export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order) => {
        const response = await createOrder(order);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async (order) => {
        const response = await updateOrder(order);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async ({ sort, pagination }) => {
        const response = await fetchAllOrders( pagination);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        status: 'idle',
        currentOrder: null,
        totalOrders: 0
    },
    reducers: {
        resetOrder: (state) => {
            state.currentOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderAsync.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders.push(action.payload.data);
                state.currentOrder = action.payload.data;
            })
            .addCase(createOrderAsync.rejected, (state) => {
                state.status = 'idle';
            })

        builder.addCase(updateOrderAsync.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.orders.findIndex(order => order.id === action.payload.data.id)
                state.orders[index] = action.payload.data;
            })
            .addCase(updateOrderAsync.rejected, (state) => {
                state.status = 'idle';
            })

        builder.addCase(fetchAllOrdersAsync.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action?.payload?.statusCode == 200) {
                    state.orders = action?.payload?.data?.orders || [];
                    state.totalOrders = action?.payload?.data?.totalOrders || 0;
                }
            })
            .addCase(fetchAllOrdersAsync.rejected, (state) => {
                state.status = 'idle';
             })
    }

});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;