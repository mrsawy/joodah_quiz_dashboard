import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// import 'src/global.css';
import './global.css';

// import '../scss/styles.scss'
// import * from 'bootstrap'

import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';
import { getLevelThunk } from './store/level/levelSlice';
import { getAllUsers } from './store/user/userSlice';
import { getSite } from './store/site/siteSlice';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLevelThunk());
    dispatch(getAllUsers());
    dispatch(getSite());
  }, [dispatch]);
  useScrollToTop();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
