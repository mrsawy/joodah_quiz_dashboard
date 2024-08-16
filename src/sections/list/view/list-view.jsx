import React, { useEffect } from 'react';
import {
  useDispatch,
  // , useSelector
} from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getListThunk } from '../../../store/level/levelSlice';

import ListGroup from '../ListGroup';

// ---------------------------------------------
export default function ListView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListThunk());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Here You Can Customize The Auto List 👋
      </Typography>

      <ListGroup />
    </Container>
  );
}
