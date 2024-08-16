import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import CircularProgress from '@mui/material/CircularProgress';

import createId from './../../utils/createID';

import {
  addListItem,
  setListIsSet,
  setListThunk,
} from '../../store/level/levelSlice';

import ListComponent from './ListComponent';

function ListGroup() {
  const { list, listIsSet, isError, message, isLoading } = useSelector(
    (s) => s.list
  );
  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(
      addListItem({ id: createId(), body: '', reply: '', enableImg: false })
    );
  };

  useEffect(() => {
    if (listIsSet) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'List Is Set  👍',
      }).then(() => {
        dispatch(setListIsSet(false));
      });
    }

    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
      });
    }
  }, [listIsSet, dispatch, isError, message]);

  return (
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
      <Box className="flex flex-row flex-wrap justify-start items-center gap-5 ">
        {Array.isArray(list) &&
          !!list.length &&
          list.map((d, index) => (
            <ListComponent
              key={d?.id}
              index={index}
              id={d?.id}
              body={d?.body}
              reply={d?.reply}
              enableImg={d?.enableImg}
            />
          ))}
      </Box>
      {Array.isArray(list) && !!list.length && (
        <Box className="flex justify-center items-center mt-6 ">
          <Button
            className=" mb-4 px-4 py-3"
            variant="contained"
            onClick={() => {
              if (list.find((item) => !item?.body || !item?.reply)) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: `Must fill all fields`,
                });
              } else {
                dispatch(
                  setListThunk(list?.filter((li) => li?.body && li?.reply))
                );
              }
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

export default ListGroup;
