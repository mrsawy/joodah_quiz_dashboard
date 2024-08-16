import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  getQuestions,
  setCurrentLevel,
  setCurrentQuestions,
} from '../../store/question/questionSlice';

export default function LevelCard({
  level_en,
  level_ar,
  level,
  _id,
  name_en,
  name_ar,
  numberOfMinutes,
  questions,
}) {
  const { questionsIsSet } = useSelector((s) => s.questions);
  const dispatch = useDispatch();
  const handleDisplayQuestions = () => {
    document.querySelectorAll(`.question-body`).forEach((ele) => {
      ele.style.display = `none`;
      ele.classList.add(`hidden`);
    });
    dispatch(setCurrentLevel(level));
    if (questions && !questionsIsSet) {
      dispatch(setCurrentQuestions(questions));
    } else {
      dispatch(getQuestions(_id));
    }
  };

  return (
    <Box sx={{ minWidth: 275, textAlign: `center` }}>
      <Card variant="outlined">
        {' '}
        <React.Fragment>
          <CardContent>
            <Typography
              style={{ direction: `rtl` }}
              className="cairo-ar"
              variant="h5"
              component="div"
            >
              {level_ar} -{name_ar}
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              {name_en} - {level_en}
            </Typography>
            <br />

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {numberOfMinutes} minutes
            </Typography>
          </CardContent>
          <CardActions
            style={{ margin: `auto`, textAlign: `center` }}
            className="flex justify-center items-center"
          >
            <Button onClick={handleDisplayQuestions} size="large">
              View Questions
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
