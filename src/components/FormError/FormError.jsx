import React from 'react';

const FormError = ({ formError }) => (
  <div className='formErrors'>{formError ? <p>Title {formError}</p> : ''}</div>
);

export default FormError;
