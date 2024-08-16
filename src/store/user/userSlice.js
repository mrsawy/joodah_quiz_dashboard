import {
  createSlice,
  //   createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { getUsersService, deleteUserService } from './userService';
// import brandService from "./brandService";

const initialState = {
  users: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  userIsSet: false,
  message: '',
};

export const getAllUsers = createAsyncThunk(
  'users/getUser',
  async (_, thunkAPI) => {
    try {
      const user = await getUsersService();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, thunkAPI) => {
    try {
      const user = await deleteUserService(id);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.userIsSet = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action?.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.userIsSet = false;
        state.message = action.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.userIsSet = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action?.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.userIsSet = false;
        state.message = action.error;
      });
  },
});

export default userSlice.reducer;
//   export const { setuserIsSet, setuser } = userSlice.actions;
