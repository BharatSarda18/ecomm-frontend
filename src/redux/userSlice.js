import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser,fetchLoggedInUserOrders ,updateUser} from "../services/userService";

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    try {
      const response = await fetchLoggedInUserOrders();
      return response.data;
    } catch (error) {}
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    try {
      const response = await fetchLoggedInUser();
      return response.data;
    } catch (error) {}
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    try {
      const response = await updateUser(update);
      return response?.data;
    } catch (error) {}
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    userInfo: {}, 
  },
  reducers: {
    setUserInfo:(state,action)=>{
      state.userInfo=action.payload;
    }
   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action,state,
          "kjubh"
        );
        if(action?.payload?.statusCode==200){
          
          state.userInfo.orders = action?.payload?.data;
        }
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if(action?.payload?.statusCode==200){
          state.userInfo = action?.payload?.data||{};
        }
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if(action?.payload?.statusCode==200){
          state.userInfo = action?.payload?.data||{};
        }
      });
   }
});

export const {setUserInfo}=userSlice.actions;
export default userSlice.reducer;
