import React from 'react';
import './MyInput.css';

const MyInput = ({...props}) => {
    return (
        <input {...props} className='add__input'/>
    );
};

export default MyInput;