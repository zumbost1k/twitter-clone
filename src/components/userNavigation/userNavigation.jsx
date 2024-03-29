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
  const [activeButton, setActiveButton] = useState('');
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsActiveMenu(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    document.addEventListener('scroll', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
      document.removeEventListener('scroll', checkIfClickedOutside);
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
        ref={modalRef}
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
          {currentUser.userName ? currentUser.userName : currentUser.nickName}
        </span>
        <span
          style={{
            transform: `rotate(${isActiveMenu ? 90 : 0}deg)`,
            transition: 'all 0.5s ease-out',
          }}
          className={'currentUser__triangle'}
        >
          <Triangle width={'10'} height={'8'} />
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
