import React from 'react';
import cl from './MyLink.module.css';

const MyLink = ({ children, change }) => {

  const getChangedFilter = (e) => {
    change((e.target.innerHTML).toLowerCase());
};

  return (
    <a className={cl.nav__link} href='#' onClick={getChangedFilter}>
      {children}
    </a>
  );
};

export default MyLink;
