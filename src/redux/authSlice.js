import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser,resetPasswordRequest,checkAuth,resetPassword ,signOut} from "../services/authService";
import { setUserInfo } from "./userSlice";

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (loginInfo, { getState,dispatch }) => {
        try {
            const response = await loginUser(loginInfo);
            return response.data;
        } catch (error) {
           // return rejectWithValue(error);
        }
    }
);

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
      try {
        const response = await createUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      } catch (error) {
        
      }
       
    }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
   async (data, { getState, dispatch }) => {
    try {
      const response = await checkAuth();
    //  state.userInfo = action?.payload?.data||{};
      console.log(response.data,"getState")
      return response.data;
    } catch (error) {
      console.log(error);
    }
});

export const resetPasswordRequestAsync = createAsyncThunk(
    'user/resetPasswordRequest',
    async (email,{rejectWithValue}) => {
      try {
        const response = await resetPasswordRequest(email);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
  
      }
    }
);
  
export const resetPasswordAsync = createAsyncThunk(
    'user/resetPassword',
    async (data,{rejectWithValue}) => {
      try {
        const response = await resetPassword(data);
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
  
      }
    }
);
  
export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
      try {
        const response = await signOut();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      } catch (error) {
        
      }
     
    }
);



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
        status: 'idle',
        error: null,
        userChecked: false,
        mailSent: false,
        passwordReset: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUserAsync.pending, (state) => { })
        .addCase(loginUserAsync.fulfilled, (state,action) => { 
          state.status = 'idle';
          state.loggedInUserToken = action?.payload?.data?.token;
           const token=action?.payload?.data?.token;
           localStorage.setItem('token',token);
        })
        .addCase(loginUserAsync.rejected, (state,action) => {
          state.status = 'idle';
          state.error = action.payload;
         })

        .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if(action?.payload?.statusCode == 201){
              state.loggedInUserToken = action.payload.data;
              const token=action?.payload?.data?.token;
              localStorage.setItem('token',token);
            }
        })
        .addCase(createUserAsync.rejected, (state) => { })

        .addCase(checkAuthAsync.pending, (state) => {
          state.status = 'loading';
         })
        .addCase(checkAuthAsync.fulfilled, (state,action) => {
          state.status = 'idle';
          // if(){}
          state.loggedInUserToken = action?.payload?.data;
          state.userChecked = true;
         })
        .addCase(checkAuthAsync.rejected, (state) => {
          state.status = 'idle';
          state.userChecked = true;
         })

        .addCase(resetPasswordRequestAsync.pending, (state) => {
          state.status = 'loading';
         })
        .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
          state.status = 'idle';
          state.mailSent = true;
         })
        .addCase(resetPasswordRequestAsync.rejected, (state) => { })

        .addCase(resetPasswordAsync.pending, (state) => {
          state.status = 'loading';
         })
        .addCase(resetPasswordAsync.fulfilled, (state) => {
          state.status = 'idle';
          state.passwordReset = true;
         })
        .addCase(resetPasswordAsync.rejected, (state,action) => { 
          state.status = 'idle';
        state.error = action.payload.data;
        })

        .addCase(signOutAsync.pending, (state) => { 
          state.status = 'loading';
        })
        .addCase(signOutAsync.fulfilled, (state) => { 
          state.status = 'idle';
        state.loggedInUserToken = null;
        localStorage.clear();
        })
        .addCase(signOutAsync.rejected, (state) => { })
    }
})


export default authSlice.reducer;