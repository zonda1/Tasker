import React from 'react';
import MyLink from '../UI/MyLink/MyLink';
import './TabsPanel.css';

const TabsPanel = ({ links,change }) => {
  return (
    <div className='tabs-panel'>
      <nav className='tabs-panel__nav'>
        {links.map((link,index) => (
          <MyLink key={index} change={change}>{link}</MyLink>
        ))}
      </nav>
    </div>
  );
};

export default TabsPanel;
