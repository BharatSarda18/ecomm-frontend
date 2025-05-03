import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchBrands,deleteProduct, fetchCategories, fetchProductById, fetchProductsByFilters, updateProduct } from "../services/productService";

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    try {
      const response = await fetchProductById(id);
      return response.data;
    } catch (error) { }
  }
);


export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    try {
      const response = await createProduct(product);
      return response.data;
    } catch (error) { }
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    try {
      const response = await updateProduct(update);
      return response.data;
    } catch (error) { }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'product/delete',
  async (deletePayload) => {
    try {
      const response = await deleteProduct(deletePayload);
      return response.data;
    } catch (error) { }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    brands: [],
    categories: [],
    status: 'idle',
    totalItems: 0,
    selectedProduct: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
    updateBrands: (state, action) => {
      state.brands = action.payload
    },
    updateCategories: (state, action) => {
      state.categories = action.payload
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateTotalItems: (state, action) => {
      state.totalItems = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action?.payload?.statusCode == 200) {
          state.selectedProduct = action?.payload?.data || {};
        }
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const product = action?.payload?.data || [];
        state.products.push(product);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state?.products?.findIndex(
          (product) => product?.id === action?.payload?.data?.id
        );
        state.products[index] = action?.payload?.data;
        state.selectedProduct = action?.payload?.data;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      });

      


  }
});
export const { clearSelectedProduct,updateBrands,updateProducts,updateTotalItems ,updateCategories} = productSlice.actions;
export default productSlice.reducer;