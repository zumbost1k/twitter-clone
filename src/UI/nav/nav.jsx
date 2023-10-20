import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

const NavElement = ({ navigationElement }) => {
  return (
    <Link className='navigation-item' to={navigationElement.path}>
      <span className='nav-icon'>{navigationElement.content}</span>
    </Link>
  );
};
export default NavElement;
