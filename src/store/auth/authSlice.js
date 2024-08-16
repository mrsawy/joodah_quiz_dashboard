import {
  createSlice,
  //   createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { loginService, checkLoggedService } from './authService';
// import brandService from "./brandService";

const initialState = {
  isLogged: null,
  id: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  checkIsDone: false,
  loggingIsDone: false,
  message: '',
};

export const checkLogged = createAsyncThunk(
  'auth/checkAuth',
  async (args, thunkAPI) => {
    try {
      const user = await checkLoggedService(args);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (args, thunkAPI) => {
  try {
    const user = await loginService(args);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //   setuser: (state, action) => {
    //     const { from, to } = action.payload;
    //     console.log(from, to);
    //     state.user = {
    //       from: from || state.user.from,
    //       to: to || state.user.to,
    //     };
    //   },
    //   setuserIsSet: (state, action) => {
    //     state.userIsSet = action.payload;
    //   },
  },
  //   ,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.checkIsDone = false;
        state.loggingIsDone = false;
        // loggingIsDone: false,
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLogged = true;
        state.loggingIsDone = true;

        state.id = action?.payload?.id;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.loggingIsDone = true;

        state.message = action.error;
      })
      .addCase(checkLogged.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(checkLogged.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLogged = true;
        state.checkIsDone = true;
        state.id = action?.payload?.id;
      })
      .addCase(checkLogged.rejected, (state, action) => {
        state.isLoading = false;
        state.checkIsDone = true;
        state.isError = true;
        state.isSuccess = false;
        state.isLogged = false;
        state.message = action.error;
        state.id = action?.payload?.id;
        state.token = action?.payload?.token;
      });
  },
});

export default authSlice.reducer;
//   export const { setuserIsSet, setuser } = userSlice.actions;
