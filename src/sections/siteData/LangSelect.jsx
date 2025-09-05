import { useSelector, useDispatch } from 'react-redux';
import { setSite } from './../../store/site/siteSlice';

import React, { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import Button from '@mui/material/Button';

function LangSelect(props) {
    const dispatch = useDispatch();
    const { siteData } = useSelector((s) => s.site);

    let examLanguage = siteData?.find((d) => d?.identifier == `examLanguage`)?.value;

    const handleSubmit = (value) => {
        console.log({ value })
        dispatch(setSite({ identifier: 'examLanguage', value }));
        window.location.reload();
    };

    return (
        <div>
            <SelectBox items={[
                { value: 'EN', name: "Only English" },
                { value: 'AR', name: "Only Arabic" },
                { value: 'MULTI', name: "Multiple languages (English and Arabic)" }
            ]}
                defaultValue={examLanguage}
                onSUbmit={handleSubmit}
            />
        </div>
    );
}

function SelectBox({ items, onSUbmit, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    return (
        <div className='flex flex-col items-center justify-center gap-9'>
            <div className="card flex justify-content-center">
                <SelectButton value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={items} className='w-full' />
            </div>
            <Button
                variant="contained"
                type='button'
                className="py-2 text-2xl" onClick={() => onSUbmit(value)} >
                Submit
            </Button>
        </div>
    );
}

export default LangSelect;