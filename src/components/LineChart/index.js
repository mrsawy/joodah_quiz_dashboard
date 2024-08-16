import * as React from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import formatResults from '../../utils/formatResults';

export default function BasicLineChart({ label, data, className }) {
  const { users } = useSelector((s) => s.user);
  let results = formatResults({ users });
  return (
    <div className="flex flex-col">
      {Object.entries(results).map((result, index) => (
        <React.Fragment key={index}>
          <div
            className={'flex justify-center items-center flex-col ' + className}
          >
            <label className="rounded-lg border-2 border-green-500 p-4">
              {result[0]}
            </label>
            <LineChart
              xAxis={[{ data: result[1]?.map((r) => r?.grade) }]}
              series={[
                {
                  data: result[1]?.map((r) => r?.numberOfUsers),
                },
              ]}
              width={500}
              height={300}
            />
            <br />
          </div>
          <hr className="my-4 border-t-2 border-blue-500 max-w-4xl m-auto" />
        </React.Fragment>
      ))}
    </div>
  );
}
