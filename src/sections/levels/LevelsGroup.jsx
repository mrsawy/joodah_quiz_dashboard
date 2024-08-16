import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import CircularProgress from '@mui/material/CircularProgress';

import createId from '../../utils/createID';
import Spinner from './../../components/Spinner';

import {
  addLevelItem,
  setLevelIsSet,
  setLevelThunk,
} from '../../store/level/levelSlice';

import LevelComponent from './LevelComponent';

function LevelsGroup() {
  const { levels, levelIsSet, isError, message, isLoading } = useSelector(
    (s) => s.levels
  );
  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(
      addLevelItem({
        id: createId(),
        name_ar: '',
        name_en: '',
        numberOfMinutes: null,
        questions: [],
        pauseTime: null,
        level_ar: null,
        level_en: null,
        newAdded: true,
      })
    );
  };

  useEffect(() => {
    if (levelIsSet) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Levels Is Set  👍',
      }).then(() => {
        dispatch(setLevelIsSet(false));
      });
    }
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
      });
    }
  }, [levelIsSet, dispatch, isError, message]);

  return isLoading ? (
    <Spinner className=" h-96" />
  ) : (
    <>
      <Box className="flex justify-end items-end ">
        <Button
          onClick={handleAddNew}
          className=" mb-4 px-4 py-3"
          style={{ fontSize: `0.99rem` }}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add New
        </Button>
      </Box>
      <Box className="flex flex-row flex-wrap justify-start items-center gap-1 ">
        {Array.isArray(levels) &&
          !!levels.length &&
          levels.map((d, index) => (
            <LevelComponent
              key={d?._id}
              index={index}
              id={d?._id}
              _id={d?._id}
              name_en={d?.name_en}
              numberOfMinutes={d?.numberOfMinutes}
              level_en={d?.level_en}
              level_ar={d?.level_ar}
              name_ar={d?.name_ar}
              level={d}
              pauseTime={d?.pauseTime}
              newAdded={d?.newAdded}
            />
          ))}
      </Box>
      {Array.isArray(levels) && !!levels.length && (
        <Box className="flex justify-center items-center mt-6 ">
          <Button
            className=" mb-4 px-4 py-3"
            variant="contained"
            onClick={() => {
              Swal.fire({
                icon: 'question',
                title: `Are you sure ?`,
                iconHtml: '؟',
                confirmButtonText: 'yes',
                cancelButtonText: 'no',
                showCancelButton: true,
                showCloseButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  let errLevel = levels.find(
                    (item) =>
                      !item?.name_ar ||
                      !item?.name_en ||
                      !item?.numberOfMinutes ||
                      !item?.pauseTime ||
                      !item?.level_ar ||
                      !item?.level_en
                  );
                  if (errLevel) {
                    console.log(errLevel);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error!',
                      text: `Must fill all fields`,
                    });
                  } else {
                    dispatch(setLevelThunk(levels));
                  }
                }
              });
            }}
            endIcon={!isLoading ? <PublishIcon /> : null}
          >
            {!isLoading ? `Submit` : <CircularProgress />}
          </Button>
        </Box>
      )}
    </>
  );
}

export default LevelsGroup;
