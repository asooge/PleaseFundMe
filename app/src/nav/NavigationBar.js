import React from 'react'
import NavigationLink from './NavigationLink'

const NavigationBar = () => {
  return (
    <div className='navigation-bar'>
      <NavigationLink title="Home" href="#/"/>
      <NavigationLink title="About" href="#/about"/>
      <NavigationLink title="Pages" href="#/pages"/>
      <NavigationLink title="Create" href="#/create"/>
    </div>
  )
}

export default NavigationBar