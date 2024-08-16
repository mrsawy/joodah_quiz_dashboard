import * as React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';

import formatResults from '../../utils/formatResults';

function ScatterChartComponent() {
  const { users, isLoading } = useSelector((s) => s.user);
  let results = formatResults({ users });
  console.log(`results scatter =>`, results);
  return isLoading ? (
    <div className="flex  w-full justify-center items-center m-auto">
      <ProgressSpinner />
    </div>
  ) : (
    <div>
      {Object.keys(results).length &&
        Object.values(results)?.map((result, i) => {
          return (
            <div key={i}>
              <ScatterChart
                width={450}
                height={300}
                series={[
                  {
                    label: Object.keys(results)[i],
                    data: result.map((r) => ({
                      x: r?.numberOfUsers,
                      y: r?.grade,
                      id: `${i}A`,
                    })),
                  },
                ]}
              />
            </div>
          );
        })}
    </div>
  );
}

export default ScatterChartComponent;
