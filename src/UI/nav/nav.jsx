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
          : `navigation-item navigation-item_active`
      }
      to={navigationElement.path}
    >
      <span
        className={
          activeButtons !== navigationElement.key
            ? `nav-icon`
            : `nav-icon nav-icon_active`
        }
      >
        {navigationElement.content}
      </span>
    </Link>
  );
};
export default NavElement;
