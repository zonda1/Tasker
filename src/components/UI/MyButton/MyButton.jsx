import React from 'react';
import cla from './MyButton.module.css';

const MyButton = ({ children, ...props }) => {
  return (
    <button className={cla.edit__button} {...props}>
      {children}
    </button>
  );
};

export default MyButton;
