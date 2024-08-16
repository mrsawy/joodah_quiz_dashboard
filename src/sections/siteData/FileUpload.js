import React, { useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FileUpload } from 'primereact/fileupload';
import { useSelector, useDispatch } from 'react-redux';
import { setSiteUpload } from '../../store/site/siteSlice';
import { base_url } from '../../utils/base_url';

function FileUploadComponent({ name, label }) {
  let dispatch = useDispatch();
  let [imgSrc, setImgSrc] = useState(null);
  const { siteData, isLoading } = useSelector((s) => s.site);

  useEffect(() => {
    if (Array.isArray(siteData)) {
      // console.log(siteData)
      let value = siteData?.find((d) => d?.identifier == name)?.value;
      if (value) {
        setImgSrc(
          base_url[base_url.length - 1] == `/`
            ? base_url + value
            : base_url + '/' + value
        );
      }
    }
  }, [siteData]);

  const selectHandler = (e) => {
    let selectedFile = e.files[0];
    const formData = new FormData();
    formData.append(name, selectedFile);
    dispatch(setSiteUpload({ formData, name }));
  };

  return isLoading ? (
    <div className="flex  w-full justify-center items-center m-auto">
      <ProgressSpinner />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col justify-center items-center gap-10">
        <label className="block mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {label ? label : 'test'}
        </label>
        {imgSrc && <img className="max-w-[250px]" src={imgSrc} />}
      </div>
      <FileUpload
        mode="basic"
        name={`${name}[]`}
        accept="image/*"
        maxFileSize={1000000}
        onSelect={selectHandler}
      />
    </div>
  );
}

export default FileUploadComponent;
