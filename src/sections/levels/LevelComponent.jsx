import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { editLevelItem, deleteLevelItem } from '../../store/level/levelSlice';

import DeleteButton from '../../components/DeleteButton';
import NumericInput from '../list/NumericInput';

function LevelComponent({
  level_ar,
  level_en,
  pauseTime,
  _id,
  name_en,
  name_ar,
  numberOfMinutes,
  index,
  newAdded,
  // level,
}) {
  // const [lang, setLang] = useState(`ar`);

  let levelData = {
    level_ar,
    level_en,
    pauseTime,
    _id,
    name_en,
    name_ar,
    numberOfMinutes,
    index,
  };
  const dispatch = useDispatch();
  return (
    <div className="flex m-auto flex-col   w-1/4">
      <Box
        className={`flex flex-row justify-center items-center gap-3 ${
          index === 0 ? 'grow-1 flex-grow w-full' : ``
        }`}
      >
        <Box className={`flex flex-column gap-4 grow-1 flex-grow`}>
          <TextField
            style={{ direction: `rtl` }}
            onChange={(event) => {
              const val = event.target.value;
              dispatch(
                editLevelItem({
                  ...levelData,
                  level_ar: val,
                })
              );
            }}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            label="Job Arabic Name"
            defaultValue={level_ar}
            multiline
          />
          <TextField
            style={{ direction: `ltr` }}
            onChange={(event) => {
              const val = event.target.value;
              dispatch(editLevelItem({ ...levelData, level_en: val }));
            }}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            label="Job English Name"
            defaultValue={level_en}
            multiline
          />
          <TextField
            style={{ direction: `rtl` }}
            onChange={(event) => {
              const val = event.target.value;
              dispatch(editLevelItem({ ...levelData, name_ar: val }));
            }}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            label="Level Arabic Name"
            defaultValue={name_ar}
            multiline
          />
          <TextField
            style={{ direction: `ltr` }}
            onChange={(event) => {
              const val = event.target.value;
              dispatch(editLevelItem({ ...levelData, name_en: val }));
            }}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            label="Level English Name"
            defaultValue={name_en}
            multiline
          />
          <NumericInput
            value={numberOfMinutes ? numberOfMinutes : null}
            defaultValue={numberOfMinutes}
            onChange={(val) => {
              dispatch(editLevelItem({ ...levelData, numberOfMinutes: val }));
            }}
            label="Number of minutes"
          />

          <NumericInput
            value={pauseTime?.value ? pauseTime?.value : null}
            defaultValue={pauseTime?.value}
            onChange={(val) => {
              dispatch(
                editLevelItem({
                  ...levelData,
                  pauseTime: { ...pauseTime, value: val },
                })
              );
            }}
            label="Pausing Minutes"
          />
          <NumericInput
            value={pauseTime?.numberOfPauses ? pauseTime?.numberOfPauses : null}
            defaultValue={pauseTime?.numberOfPauses}
            onChange={(val) => {
              dispatch(
                editLevelItem({
                  ...levelData,
                  pauseTime: { ...pauseTime, numberOfPauses: val },
                })
              );
            }}
            label="Pausing Times"
          />
        </Box>
        {!(index == 0 && newAdded) && (
          <div className="flex flex-col gap-8">
            <DeleteButton
              onClick={() => {
                dispatch(deleteLevelItem(_id));
              }}
            />
          </div>
        )}
      </Box>
    </div>
  );
}

export default LevelComponent;
