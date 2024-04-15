import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilters, updateProduct } from "../services/productService";

export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
      const response = await fetchProductById(id);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  
  export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({ filter, sort, pagination, admin }) => {
      const response = await fetchProductsByFilters(filter, sort, pagination, admin);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  
  export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands',
    async () => {
      const response = await fetchBrands();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async () => {
      const response = await fetchCategories();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  
  export const createProductAsync = createAsyncThunk(
    'product/create',
    async (product) => {
      const response = await createProduct(product);
      return response.data;
    }
  );
  
  export const updateProductAsync = createAsyncThunk(
    'product/update',
    async (update) => {
      const response = await updateProduct(update);
      return response.data;
    }
  );

  
export const productSlice=createSlice({
    name:'product',
    initialState:{
        products: [],
        brands: [],
        categories: [],
        status: 'idle',
        totalItems: 0,
        selectedProduct: null,
    },
    reducers:{
        clearSelectedProduct:(state)=>{
            state.selectedProduct = null
        }
    },
    extraReducers:(builder)=>{
      builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action?.payload?.data?.result||[];
        state.totalItems = action?.payload?.data?.totalCount||0;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload.data;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload.data;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload.data;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload.data);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.data.id
        );
        state.products[index] = action.payload.data;
        state.selectedProduct = action.payload.data;

      });


    
    }
});
export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;