import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';

function NumericInput({ label, onChange }) {
  const handleInputChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = value;
  };
  return (
    <TextField
      label={label}
      type="text" // Use type="text" to allow custom input handling
      inputProps={{
        pattern: '[0-9]*', // Use the pattern attribute for better mobile support
      }}
      onChange={(e) => {
        handleInputChange(e);
        if (onChange && typeof onChange == `function`) {
          onChange(e);
        }
      }}
    />
  );
}

NumericInput.propTypes = {
  label: PropTypes.string.isRequired,
};
export default NumericInput;
