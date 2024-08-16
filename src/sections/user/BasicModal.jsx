import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

export default ({
  result,
  grade,
  user,
  name,
  phone,
  email,
  age,
  experience,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Details
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            {name}
          </Typography>

          <Divider
            sx={{
              borderColor: `unset`,
              borderWidth: `opx`,
              padding: `1px`,
              backgroundColor: `#686D76`,
              marginBottom: `10px`,
            }}
            orientation="vertical"
            flexItem
          />

          <Typography component="h4">
            <strong>email</strong> : {email}
          </Typography>
          <Typography component="h4">
            <strong>phone</strong> : {phone}
          </Typography>
          <Typography component="h4">
            <strong>phone</strong> : {phone}
          </Typography>
          <Typography component="h4">
            <strong>age</strong> : {age}
          </Typography>
          <Typography component="h4">
            <strong>Exam</strong> :{result?.levelName}
          </Typography>
          <Typography component="h4">
            <strong>Grade</strong> : {(+grade).toFixed(2)} / 100
          </Typography>
          <Typography component="h4">
            <strong>Time taken</strong> :{' '}
            {timeFormat(
              (result?.timeTaken / 1000).toFixed(0),
              result?.fullTime
            )}
          </Typography>
          {user?.academicSpecialization && (
            <Typography component="h4">
              <strong>Academic Specialization</strong> :{' '}
              {user?.academicSpecialization}
            </Typography>
          )}

          {user?.countryOfResidence && (
            <Typography component="h4">
              <strong>Country Of Residence</strong> : {user?.countryOfResidence}
            </Typography>
          )}
          {user?.gender && (
            <Typography component="h4">
              <strong>gender</strong> : {user?.gender}
            </Typography>
          )}
          {user?.nationality && (
            <Typography component="h4">
              <strong>nationality</strong> : {user?.nationality}
            </Typography>
          )}

         {!!experience && <Typography component="h4">
            <strong>experience</strong> : {experience}
          </Typography>}

          {(user?.relatedExperience || user?.relatedExperience == 0) && (
            <Typography component="h4">
              <strong>Related Experience</strong> : {user?.relatedExperience}
            </Typography>
          )}

          <Typography
            id="modal-modal-description"
            className="     text-sm   "
            sx={{ mt: 2 }}
          ></Typography>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  gap: 2,
  flexDirection: `column`,
  borderRadius: 2,
  maxHeight: `90vh`,
  overflowY: 'scroll', 
  overflowX: 'hidden', 
  msOverflowStyle: 'none', 
  scrollbarWidth: 'none', 
  '::-webkit-scrollbar': {
    display: 'none', 
  },
};

function timeFormat(s, full) {
  var seconds = +s;
  let fullTime = +full;

  if (
    (typeof seconds !== 'number' || seconds < 0) &&
    typeof fullTime !== 'number'
  ) {
    return 'Invalid input';
  }
  if (
    (typeof seconds !== 'number' || seconds < 0 || isNaN(seconds)) &&
    typeof fullTime == 'number'
  ) {
    seconds = fullTime;
    // console.log(seconds, fullTime);
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${hours}h ${minutes}m ${remainingSeconds}s`;
  return formattedTime;
}
