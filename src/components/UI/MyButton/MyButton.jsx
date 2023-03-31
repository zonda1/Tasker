import React from 'react';

const MyButton = ({ children,type, ...props }) => {
  return (
    <button type='button' {...props}>
      {children}
    </button>
  );
};

export default MyButton;
