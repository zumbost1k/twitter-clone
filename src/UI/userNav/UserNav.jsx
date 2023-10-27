import React from 'react';
import './userNav.css';
import { Link } from 'react-router-dom';

const UserNavElement = ({
  navigationElement,
  interactionToolClick,
  className,
  activeButtons,
}) => {
  return (
    <Link
      onClick={() => {
        interactionToolClick(navigationElement.title);
      }}
      className={
        activeButtons !== navigationElement.title
          ? `${className} navigation-item-modal`
          : `${className} navigation-item-modal navigation-item_active`
      }
      to={navigationElement.path}
    >
      <span>{navigationElement.icon}</span>
      <span>{navigationElement.title}</span>
    </Link>
  );
};
export default UserNavElement;
