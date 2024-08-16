import { configureStore } from '@reduxjs/toolkit';

// import timeReducer from './time/timeSlice';
import levelReducer from './level/levelSlice';
import questionSlice from './question/questionSlice';
import userSlice from './user/userSlice';
import authSlice from './auth/authSlice';
import siteSlice from './site/siteSlice';

export const store = configureStore({
  reducer: {
    levels: levelReducer,
    user: userSlice,
    questions: questionSlice,
    auth: authSlice,
    site: siteSlice,
  },
});
