import React from 'react';
import NavigationLink from './NavigationLink';
import './NavigationBar.scss';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <NavigationLink title="Home" href="#/" />
      <NavigationLink title="About" href="#/about" />
      <NavigationLink title="Users" href="#/users" />
      <NavigationLink title="Get Started" href="#/create-user" />
    </div>
  );
};

export default NavigationBar;
