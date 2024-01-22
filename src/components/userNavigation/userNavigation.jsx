import React, { useEffect, useRef, useState } from 'react';
import UserProfile from '@/icons/userProfile';
import GroupChat from '@/icons/groupChat';
import Settings from '@/icons/settings';
import Logout from '@/icons/logout';
import UserNavElement from '@/UI/userNav/UserNav';
import { useDispatch, useSelector } from 'react-redux';
import './userNavigation.css';
import { selectCurrentUser } from '@/selectors/selectors';
import Triangle from '@/icons/triangle';
import { deleteCurrentUser } from '@/slices/currentUserSlice';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  {
    icon: <UserProfile width={'20'} height={'20'} />,
    title: 'My Profile',
    path: `/user/currentUser`,
  },
  {
    icon: <GroupChat width={'20'} height={'20'} />,
    title: 'Group chat',
    path: '/chat',
  },
  {
    icon: <Settings width={'20'} height={'20'} />,
    title: 'Settings',
    path: '/userSettings',
  },
];

const UserNavigation = () => {
  const [activeButton, setActiveButton] = useState('My Profile');
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsActiveMenu(false);
    };

    const handlePageChange = () => {
      setIsActiveMenu(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handlePageChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handlePageChange);
    };
  }, []);

  const interactionToolClick = (buttonName) => {
    setActiveButton(buttonName);
    setIsActiveMenu(!isActiveMenu);
  };

  const interactionToolClickLogOut = () => {
    setActiveButton('Logout');

    fetch(
      'https://twittercloneapiproductionenv.azurewebsites.net/Authentication/LogOut',
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then(() => {
        setIsActiveMenu(!isActiveMenu);
        dispatch(deleteCurrentUser());
      })
      .finally(() => {
        navigate('/authorization');
      });
  };

  const mappedLinks = navLinks.map((link) => {
    return (
      <li key={link.title}>
        <UserNavElement
          navigationElement={link}
          activeButtons={activeButton}
          interactionToolClick={interactionToolClick}
        />
      </li>
    );
  });

  return (
    <>
      <div
        className='currentUser__info'
        ref={elementRef}
        onClick={() => setIsActiveMenu(!isActiveMenu)}
      >
        <img
          className='avatar header__avatar'
          src={`${currentUser.profileAvatar}`}
          width={'32'}
          height={'32'}
          alt='user-avatar'
        />
        <span className='dark-text currentUser__dark-text'>
          {currentUser.userName}
        </span>
        <span className={'currentUser__triangle'}>
          <Triangle width={'7'} height={'5'} />
        </span>
      </div>
      <nav
        className={
          isActiveMenu
            ? 'currentUser__menu currentUser__menu_active'
            : 'currentUser__menu'
        }
      >
        <ul className={'currentUser__container'}>
          {mappedLinks}
          <div className={'navigation-item_logout-element'}>
            <UserNavElement
              navigationElement={{
                icon: <Logout width={'20'} height={'20'} />,
                title: 'Logout',
              }}
              activeButtons={activeButton}
              className={'navigation-item_logout-title'}
              interactionToolClick={interactionToolClickLogOut}
            />
          </div>
        </ul>
      </nav>
    </>
  );
};

export default UserNavigation;
