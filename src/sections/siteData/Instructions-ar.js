import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from 'primereact/editor';
import Button from '@mui/material/Button';
import { setSite } from '../../store/site/siteSlice';

export default function InstructionsAR() {
  const dispatch = useDispatch();
  const { siteData } = useSelector((s) => s.site);
  const [text, setText] = useState('');

  let value = siteData?.find(
    (d) => d?.identifier == `instructions-ar`
  )?.value;
  useLayoutEffect(() => {
    if (Array.isArray(siteData)) {
      if (value) {
        // console.log(`value has`);
        setTimeout(() => {
          setText(value);
          // console.log(`timeout`);
        }, 100);
      }
    }
  }, [siteData]);

  const handleSubmit = () => {
    dispatch(setSite({ identifier: 'instructions-ar', value: text }));
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <>
      <div className="card">
        <div className="flex justify-center items-center my-6 flex-col">
          <label className=" border-4 rounded-xl border-blue-400  p-3 text-xl">
            Quiz english Instructions
          </label>

          <div className='flex flex-col gap-9 w-full p-4'>

            <h2 className='m-auto text-xl font-bold'>old instructions</h2>

            <div
              dir='rtl'
              className=" leading-7 "
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>

        </div>
        <Editor
          value={text}
          //   defaultValue={siteData?.find((d) => d?.identifier == `instructions`)?.value}
          onTextChange={(e) => setText(e.htmlValue)}
          style={{ height: '620px' }}
        />
      </div>
      <div className="card flex justify-content-center mx-auto my-2 max-w-36">
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="py-2 text-2xl"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
