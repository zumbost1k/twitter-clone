import React, { useState } from 'react';
import './navigation.css';
import Home from '@/icons/home';
import Bookmark from '@/icons/bookmark';
import Compass from '@/icons/compass';
import NavElement from '@/UI/nav/nav';
import { useAuth } from '@/hooks/use-auth';
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
  const [activeButtons, setActiveButtons] = useState('Home');
  const interactionToolClick = (buttonName) => {
    setActiveButtons(buttonName);
  };
  const { isAuth } = useAuth();
  if (isAuth) {
    return (
      <nav className='navigation'>
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
  }
};

export default Navigation;
