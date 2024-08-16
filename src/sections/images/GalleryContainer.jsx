import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material';

import { addImages } from './../../store/images/imageSlice';

import ImageGallery from './ImagesGallery';

function GalleryContainer() {
  const { isLoading } = useSelector((s) => s.images);
  const dispatch = useDispatch();
  const handleAddNew = (event) => {
    const chosenFile = event?.target?.files?.[0];

    console.log(chosenFile);
    const formDataObj = new FormData();
    formDataObj.append(chosenFile?.name, chosenFile);
    dispatch(addImages(formDataObj));
  };
  return (
    <>
      <Box className="flex justify-end items-end ">
        <Button
          className=" mb-3 px-3 py-2"
          style={{ fontSize: `0.99rem` }}
          variant="contained"
          component="label"
          endIcon={!isLoading ? <AddIcon /> : null}
        >
          {!isLoading ? (
            <>
              Add New
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                hidden
                onChange={handleAddNew}
              />
            </>
          ) : (
            <CircularProgress />
          )}
        </Button>
      </Box>
      <ImageGallery />
    </>
  );
}

export default GalleryContainer;
