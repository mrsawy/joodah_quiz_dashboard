import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BasicLineChart from '../../../components/LineChart';
import BasicPieChart from '../../../components/PieChart';
import ScatterChart from '../../../components/ScatterChart';

// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi Admin , Welcome back 👋
      </Typography>

      <div className="flex flex-row flex-wrap  justify-between  items-start border rounded-2xl  m-auto border-5 xl:w-4/5">
        <div className="border-r-4 py-11 lg:w-2/4">
          {/* <BasicLineChart className="flex flex-col flex-nowrap  border-b-4" /> */}
          <ScatterChart />
        </div>
        <div className="flex justify-center items-center w-full lg:w-2/4 m-auto">
          <BasicPieChart className="mt-24" />
        </div>
      </div>
    </Container>
  );
}
