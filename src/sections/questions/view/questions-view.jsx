import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LevelCard from '../LevelCard';
import QuestionsGroup from '../QuestionsGroup';
import AddEditQuestion from '../AddEditQuestion';
import { getLevelThunk } from '../../../store/level/levelSlice';
import Spinner from '../../../components/Spinner';
// ----------------------------------------------------------------------
export default function ProductsView() {
  const { levels, levelIsSet, isError, message, isLoading } = useSelector(
    (s) => s.levels
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLevelThunk());
  }, [dispatch]);
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Here You Can Customize The Questions 👋
      </Typography>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <AddEditQuestion />
          <div className="w-full flex justify-center items-center  gap-16 mb-8 flex-wrap">
            {levels.map((l) => (
              <LevelCard
                name_en={l?.name_en}
                name_ar={l?.name_ar}
                level_en={l?.level_en}
                level_ar={l?.level_ar}
                questions={l?.questions}
                numberOfMinutes={l?.numberOfMinutes}
                _id={l?._id}
                level={l}
              />
            ))}
          </div>
          <QuestionsGroup />
        </>
      )}
    </Container>
  );
}
