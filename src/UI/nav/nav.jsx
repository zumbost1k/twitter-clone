import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

const NavElement = ({
  navigationElement,
  interactionToolClick,
  activeButtons,
}) => {
  return (
    <Link
      onClick={() => {
        interactionToolClick(navigationElement.key);
      }}
      className={
        activeButtons !== navigationElement.key
          ? `navigation-item`
          : `navigation-item navigation-item__active`
      }
      to={navigationElement.path}
    >
      <span className='nav-icon'>{navigationElement.content}</span>
    </Link>
  );
};
export default NavElement;
