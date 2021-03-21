import React from 'react';

const NavigationLink = ({ title, href, style }) => {
  return (
    <a className="nav-bar-button" href={href} style={style}>
      {title}
    </a>
  );
};

export default NavigationLink;
