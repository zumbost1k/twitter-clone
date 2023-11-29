import React, { useState } from 'react';
import UserNavigation from '../userNavigation/userNavigation';
import './header.css';
import { useAuth } from '@/hooks/use-auth';
import Tweeter from '@/icons/tweeter';
import NavElement from '@/UI/nav/nav';
import {Link} from "react-router-dom";

const navLinks = [
  {
    content: 'Home',
    key: 'Home',
    path: `/home`,
  },
  {
    content: 'Explore',
    key: 'Explore',
    path: '/explore',
  },
  {
    content: 'Bookmarks',
    key: 'Bookmarks',
    path: '/bookmarks',
  },
];
const Header = () => {
  const { isAuth } = useAuth();
  const [activeButtons, setActiveButtons] = useState('Home');

  const interactionToolClick = (buttonName) => {
    setActiveButtons(buttonName);
  };
  if (isAuth) {
    return (
      <section className='header'>
        <div className='header__container'>
          <Link to={`/home`} onClick={() => setActiveButtons('Home')}>
            <Tweeter width={'90'} height={'20'} />
          </Link>
          <div className='navigate__container'>
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
          <UserNavigation />
        </div>
      </section>
    );
  }
};

export default Header;
