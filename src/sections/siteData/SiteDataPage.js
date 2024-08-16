import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Instructions from './Instructions';
import Spinner from '../../components/Spinner/index';
import InstructionsAR from './Instructions-ar';
import FileUpload from './FileUpload';

export default function BasicDemo() {
  const { isLoading } = useSelector((s) => s.site);
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Instructions />
      <hr className="  my-40" />
      <InstructionsAR />
      <hr className="  my-40" />
      <FileUpload name="joodah_logo" label="Site Logo" />
      <hr className="  my-40" />
      <FileUpload name="joodah_thnx" label="Thank You Image" />
    </div>
  );
}
