import React, { Component } from 'react';
import cl from './MyLink.module.css';

class MyLink extends Component {

  render() {
    const { children, id, change, isActive } = this.props;
    return (
      <li className='nav-item'>
        <a
          className={'nav-link' + (isActive === id.toLowerCase() ? ' active' : '')}
          id={id}
          href='#'
          onClick={change}
        >
          {children}
        </a>
      </li>
    );
  }
}

export default MyLink;
