import React from 'react';
import './MyInput.css';

const MyInput = ({ ...props }) => {
  return <input {...props} className='form-control' />;
};

export default MyInput;
