import {
  createSlice,
  //   createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { setSiteData, getSiteData, setSiteDataUpload } from './siteService';
// import brandService from "./brandService";

const initialState = {
  siteData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  // siteIsSet: false,
  message: '',
};

export const getSite = createAsyncThunk('site/getSite', async (_, thunkAPI) => {
  try {
    const result = await getSiteData();
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const setSite = createAsyncThunk(
  'site/setSite',
  async (args, thunkAPI) => {
    try {
      const result = await setSiteData(args);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setSiteUpload = createAsyncThunk(
  'site/setSiteUpload',
  async (args, thunkAPI) => {
    try {
      const result = await setSiteDataUpload(args);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {},
  //   ,
  extraReducers: (builder) => {
    builder
      .addCase(getSite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.siteIsSet = false;
      })
      .addCase(getSite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.siteData = action?.payload;
      })
      .addCase(getSite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.siteIsSet = false;
        state.message = action.error;
      })
      .addCase(setSite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.siteIsSet = false;
      })
      .addCase(setSite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.siteIsSet = true;
        state.siteData = action?.payload;
      })
      .addCase(setSite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.siteIsSet = false;
        state.message = action.error;
      })
      .addCase(setSiteUpload.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.siteIsSet = false;
      })
      .addCase(setSiteUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.siteData = action?.payload;
      })
      .addCase(setSiteUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.siteIsSet = false;
        state.message = action.error;
      });
  },
});

export default siteSlice.reducer;
// export const { setSiteIsSet } = siteSlice.actions;
