import {
  createSlice,
  //   createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { getLevelService, setLevelService } from './levelService';
// import brandService from "./brandService";

const initialState = {
  levels: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  levelIsSet: false,
  message: '',
};

export const getLevelThunk = createAsyncThunk(
  'level/getLevel',
  async (_, thunkAPI) => {
    try {
      const level = await getLevelService();
      return level;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const setLevelThunk = createAsyncThunk(
  'level/setLevel',
  async (args, thunkAPI) => {
    try {
      // console.log(`creating args`,args);
      let levels = args.map((level) => ({ ...level, questions: [] }));

      const level = await setLevelService(levels);
      return level;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.levels = action.payload;
    },
    addLevelItem: (state, action) => {
      state.levels = [action.payload, ...state.levels];
    },
    editLevelItem: (state, action) => {
      const {
        _id,
        numberOfMinutes,
        name_en,
        name_ar,
        pauseTime,
        level_ar,
        level_en,
      } = action.payload;
      state.levels = state.levels.map((ele) =>
        ele._id === _id
          ? {
              ...ele,
              name_en,
              name_ar,
              numberOfMinutes,
              pauseTime,
              level_ar,
              level_en,
            }
          : ele
      );
    },
    deleteLevelItem: (state, action) => {
      state.levels = state.levels.filter((s) => s?._id !== action?.payload);
    },
    setLevelIsSet: (state, action) => {
      state.levelIsSet = action.payload;
    },
  },
  //   ,
  extraReducers: (builder) => {
    builder
      .addCase(getLevelThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.msgIsSet = false;
      })
      .addCase(getLevelThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.levels = action?.payload ? action?.payload : [];
      })
      .addCase(getLevelThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.msgIsSet = false;
        state.message = action.error?.message;
      })
      .addCase(setLevelThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.msgIsSet = false;
      })
      .addCase(setLevelThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.levelIsSet = true;
        state.main = action?.payload?.level ? action?.payload?.level : [];
      })
      .addCase(setLevelThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.levelIsSet = false;
        state.message = action.error?.message;
      });
  },
});

export default levelSlice.reducer;
export const {
  setLevelIsSet,
  setLevel,
  addLevelItem,
  deleteLevelItem,
  editLevelItem,
} = levelSlice.actions;
