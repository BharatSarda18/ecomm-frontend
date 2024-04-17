import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItemsByUserId, updateCart, deleteItemFromCart, resetCart } from "../services/cartService";

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ item, product }) => {

    const response = await addToCart(item);
    //  alert.success('Item Added to Cart');

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addToCartAsyncAdmin = createAsyncThunk(
  'cart/addToCart/admin',
  async (newItem) => {
    console.log(newItem, "newItemslice")
    const response = await addToCart(newItem);
    //  alert.success('Item Added to Cart');

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    status: 'idle',
    items: [],
    cartLoaded: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action?.payload?.statusCode == 201) {
          let product = { ...action?.meta?.arg?.product };
          let item = { ...action?.meta?.arg?.item };
          item.product = product;
          state.items.push(item);
        }
      })
      .addCase(addToCartAsync.rejected, (state) => { })


    builder.addCase(addToCartAsyncAdmin.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(addToCartAsyncAdmin.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action?.payload?.statusCode == 201) {
          const newCart = action?.payload?.data || {};
          state.items.push(newCart);
        }
      })
      .addCase(addToCartAsyncAdmin.rejected, (state) => { })

      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
        let cart = action?.payload?.data || [];
        if (action?.payload?.statusCode == 200) {
          state.items = cart;
        }
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })

      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action?.payload?.statusCode == 200) {
          const updatedData = action?.payload?.data || {};
          const index = state?.items?.findIndex(item => item.id === updatedData?.id);
          let cart = { ...state?.items[index] };
          cart.quantity = updatedData?.quantity;
          state.items[index] = cart;
        }
      })
      .addCase(updateCartAsync.rejected, (state) => { })

      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action?.payload?.statusCode == 200) {
          const updatedData = action?.payload?.data || {};
          const index = state?.items?.findIndex(item => item.id === updatedData?.id)
          state.items.splice(index, 1);
        }
      })
      .addCase(deleteItemFromCartAsync.rejected, (state) => { })

      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        if (action?.payload?.statusCode == 200) {
          state.status = 'idle';
          state.items = [];
        }
      })
      .addCase(resetCartAsync.rejected, (state) => { })
  }

})

export default cartSlice.reducer;