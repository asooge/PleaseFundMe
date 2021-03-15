import React from 'react'

const NavigationLink = ({title, href}) => {
  return(
    <a className="nav-bar-button" href={href}>
      {title}
    </a>
  )
}

export default NavigationLink
