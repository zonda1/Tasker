import React, { Component } from 'react';
import MyLink from '../UI/MyLink/MyLink';
import './TabsPanel.css';

class TabsPanel extends Component {

   getChangedFilter = (e) => {
    this.props.change(e.target.innerHTML.toLowerCase());
    this.setState({
      active: e.target.id
    });
  }
  render() {
    const {links,current}=this.props;

    return (
      <div className='tabs-panel'>
        <ul className='nav nav-tabs'>
          {links.map((link, index) => (
           <MyLink key={index} id={link} isActive={current} change={this.getChangedFilter}>
              {link}
            </MyLink>
          ))}
        </ul>
      </div>
    );
  }
}

export default TabsPanel;
