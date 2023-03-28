import React from 'react';
import cla from './MyButton.module.css';

const MyButton = ({children,...props}) => {
    return (
        <button {...props} className={cla.edit__button}>{children}</button>
    );
};

export default MyButton;