import React from 'react';
import NavigationLink from '../components/NavigationLink/NavigationLink';
import './NavigationBar.scss';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <NavigationLink title="Home" href="#/" />
      <NavigationLink title="About" href="#/about" />
      <NavigationLink title="Users" href="#/users" />
      <NavigationLink title="Get Started" href="#/get-started" />
    </div>
  );
};

export default NavigationBar;
