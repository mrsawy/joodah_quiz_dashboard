import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Label from './../../components/label';
import Iconify from './../../components/iconify';
import { useDispatch } from 'react-redux';
import { deleteUser } from './../../store/user/userSlice';
import BasicModal from './BasicModal';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  email,
  phone,
  date,
  result,
  grade,
  exam,
  id,
  handleClick,
  age,
  experience,
  education,
  user,
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        {/* 
        <TableCell className="  pl-5" component="th" scope="row" padding="none" align="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap sx={{ textAlign: `center`, margin: `auto` }}>
              {name}
            </Typography>
          </Stack>
        </TableCell> */}
        <TableCell align="center">{name}</TableCell>

        <TableCell align="center">{result?.levelName}</TableCell>

        <TableCell align="center">{(+grade).toFixed(2)}</TableCell>

        <TableCell align="center">{date}</TableCell>
        <TableCell align="center">{education}</TableCell>
        {/* <TableCell align="center">{experience}</TableCell> */}
        {/* <TableCell align="center" className="text-center m-auto"> */}
        {/* {exam} */}
        {/* </TableCell> */}
        {/* <TableCell align="center">{date}</TableCell> */}
        <TableCell align="center">
          <BasicModal
            id={id}
            phone={phone}
            user={user}
            result={result}
            grade={grade}
            // date={date}
            email={email}
            age={age}
            experience={experience}
            name={name}
          />
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <button
            className="w-full flex items-center   leading-7"
            onClick={() => {
              // console.log(`delete clicked`, id);
              dispatch(deleteUser(id));
            }}
          >
            <>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </>
          </button>
        </MenuItem>
      </Popover>
    </>
  );
}
