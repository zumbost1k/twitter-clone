import React, { useState } from 'react';
import './navigation.css';
import Home from '@/icons/home';
import Bookmark from '@/icons/bookmark';
import Compass from '@/icons/compass';
import NavElement from '@/UI/nav/nav';
const navLinks = [
  {
    content: <Home width={'24'} height={'24'} />,
    key: 'Home',
    path: `/home`,
  },
  {
    content: <Compass width={'24'} height={'24'} />,
    key: 'Explore',
    path: '/explore',
  },
  {
    content: <Bookmark width={'24'} height={'24'} />,
    key: 'Bookmarks',
    path: '/bookmarks',
  },
];

const Navigation = () => {
  const [activeButtons, setActiveButtons] = useState('Explore');
  const interactionToolClick = (buttonName) => {
    setActiveButtons(buttonName);
  };
  return (
    <nav>
      <div className='nav-container'>
        {navLinks.map((currentNavLink) => {
          return (
            <NavElement
              key={currentNavLink.key}
              navigationElement={currentNavLink}
              interactionToolClick={interactionToolClick}
              activeButtons={activeButtons}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
