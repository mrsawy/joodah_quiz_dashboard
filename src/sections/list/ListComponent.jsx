import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { editListItem, deleteListItem } from '../../store/level/levelSlice';

import DeleteButton from './../../components/DeleteButton';

// const label = { inputProps: { 'aria-label': 'Switch demo' } };

function ListComponent({ id, body, reply, enableImg, index }) {
  const [lang, setLang] = useState(`ar`);

  const dispatch = useDispatch();
  return (
    <div className={index === 1 || index === 0 ? 'flex w-100 flex-col' : ``}>
      <Box
        width="100%"
        className="inline-block w-auto m-auto"
        style={{ padding: `25px 45px` }}
      >
        <ToggleButtonGroup
          color="primary"
          value={lang}
          exclusive
          onChange={(e) => {
            setLang(e.target.value);
          }}
          aria-label="Platform"
        >
          <ToggleButton value="ar">Arabic</ToggleButton>
          <ToggleButton value="en">English</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        className={`flex flex-row justify-center items-center gap-3 ${
          index === 1 || index === 0 ? 'grow-1 flex-grow w-full' : ``
        }`}
      >
        <Box
          style={{ direction: lang === `ar` ? `rtl` : `ltr` }}
          className={`flex flex-column gap-4 
        ${index === 1 || index === 0 ? 'grow-1 flex-grow' : ``}`}
        >
          <TextField
            onChange={(event) => {
              const val = event.target.value;
              dispatch(editListItem({ id, body: val, reply, enableImg }));
            }}
            label="Massage Body"
            defaultValue={body}
            multiline
          />
          <TextField
            onChange={(event) => {
              const val = event.target.value;
              dispatch(editListItem({ id, reply: val, body, enableImg }));
            }}
            label="Massage Reply"
            defaultValue={reply}
            multiline
            rows={index !== 1 && index !== 0 ? 7 : 9}
          />
        </Box>
        {index !== 1 && index !== 0 && (
          <div className="flex flex-col gap-8">
            <DeleteButton
              onClick={() => {
                dispatch(deleteListItem(id));
              }}
            />

            <div className="flex flex-col gap-0 justify-center items-center">
              <label className="text-sm" htmlFor={id}>
                Enable Images
              </label>
              <Switch
                id={id}
                checked={enableImg}
                onChange={(event) => {
                  console.log(event.target.checked);
                  dispatch(
                    editListItem({
                      id,
                      body,
                      reply,
                      enableImg: event.target.checked,
                    })
                  );
                }}
              />
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

ListComponent.propTypes = {
  body: PropTypes.string,
  reply: PropTypes.string,
  id: PropTypes.string,
  enableImg: PropTypes.bool,
  index: PropTypes.number,
};
export default ListComponent;
