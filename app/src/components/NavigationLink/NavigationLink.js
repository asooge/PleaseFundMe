import React from 'react';
import './NavigationLink.scss'

const NavigationLink = ({ title, href, style }) => {
  return (
    <a className="nav-bar-button" href={href} style={style}>
      {title}
    </a>
  );
};

export default NavigationLink;
