import {
  createSlice,
  //   createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { uploads_url } from '../../utils/base_url';
import {
  addQuestionsService,
  getQuestionsService,
  deleteQuestionService,
  editQuestionsService,
} from './questionService';
// import brandService from "./brandService";

const initialState = {
  currentLevel: null,
  currentQuestions: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  questionsIsSet: false,
  questionsIsDeleted: false,
  message: '',
};

export const getQuestions = createAsyncThunk(
  'questions/getQuestions',
  async (levelId, thunkAPI) => {
    try {
      const questions = await getQuestionsService(levelId);
      return questions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editQuestion = createAsyncThunk(
  'questions/editQuestions',
  async (args, thunkAPI) => {
    try {
      const questions = await editQuestionsService(args);
      return questions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addQuestions = createAsyncThunk(
  'questions/addQuestions',
  async (args, thunkAPI) => {
    try {
      const questions = await addQuestionsService(args);
      return questions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestion',
  async (args, thunkAPI) => {
    try {
      return await deleteQuestionService(args);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setCurrentQuestions: (state, action) => {
      state.currentQuestions = action.payload;
    },
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    setQuestionsIsSet: (state, action) => {
      state.questionsIsSet = action.payload;
    },
    setQuestionsIsDeleted: (state, action) => {
      state.questionsIsSet = action.payload;
    },
  },
  //   ,
  extraReducers: (builder) => {
    builder
      .addCase(addQuestions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.questionsIsSet = false;
      })
      .addCase(addQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentQuestions = action.payload?.questions;
        state.questionsIsSet = true;
      })
      .addCase(addQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.questionsIsSet = false;
        state.message = action.error;
      })
      .addCase(editQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.questionsIsSet = false;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentQuestions = action.payload?.questions;
        state.questionsIsSet = true;
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.questionsIsSet = false;
        state.message = action.error;
      })
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentQuestions = action?.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentQuestions = action?.payload?.questions;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default questionsSlice.reducer;
export const { setCurrentQuestions, setCurrentLevel } = questionsSlice.actions;
