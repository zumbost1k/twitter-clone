import React, { useEffect, useRef, useState } from 'react';
import './notification.css';
import Bell from '@/icons/bell';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const notifications = [
  {
    notificationId: 1,
    notificationUserId: 3,
    createdAt: '2024-01-16T07:39:34.713',
    notificationUserPhoto:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    notificationUserName: 'misha',
    notificationText:
      'Confirm actions with notifications in mobile apps. To do this, tether your device',
  },
  {
    notificationId: 2,
    notificationUserId: 3,
    createdAt: '2024-01-16T07:39:34.713',
    notificationUserPhoto:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    notificationUserName: 'misha',
    notificationText: 'liked your post',
  },
  {
    notificationId: 3,
    notificationUserId: 3,
    createdAt: '2024-01-16T07:39:34.713',
    notificationUserPhoto:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    notificationUserName: 'misha',
    notificationText: 'subscribed to you',
  },
];

const oldNatification = [
  {
    notificationId: 4,
    notificationUserId: 3,
    createdAt: '2024-01-16T07:39:34.713',
    notificationUserPhoto:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    notificationUserName: 'misha',
    notificationText:
      'Confirm actions with notifications in mobile apps. To do this, tether your device',
  },
  {
    notificationId: 5,
    notificationUserId: 3,
    createdAt: '2024-01-16T07:39:34.713',
    notificationUserPhoto:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    notificationUserName: 'misha',
    notificationText: 'liked your post',
  },
  {
    notificationId: 6,
    notificationUserId: 3,
    createdAt: '2024-01-16T07:39:34.713',
    notificationUserPhoto:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    notificationUserName: 'misha',
    notificationText: 'subscribed to you',
  },
];

const Notification = () => {
  const { userId } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [currentNotifications, setCurrentNotification] = useState(null);
  const [isAllNotificationShow, setIsAllNotificationShow] = useState(false);
  const modalRef = useRef();

  const getLastNotification = () => {
    setCurrentNotification(notifications);
    setShowModal(true);
    setIsAllNotificationShow(false);
  };

  const getAllNotification = () => {
    setCurrentNotification(currentNotifications.concat(oldNatification));
    setIsAllNotificationShow(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={modalRef} className='notification relative'>
      <button onClick={getLastNotification} className='bell notification__bell'>
        <Bell width={'32'} height={'32'} />
      </button>

      {showModal && (
        <div className='container modal notification__modal'>
          <h3 className='subtitle subtitle__modal'>Your page notification</h3>
          <div>
            {currentNotifications.map((currentNotification) => {
              const dateOfNoitfication = new Date(
                currentNotification.createdAt
              );
              return (
                <Link
                  to={
                    userId === currentNotification.notificationUserId
                      ? '/user/currentUser'
                      : `/user/${currentNotification.notificationUserId}`
                  }
                  className='current-notification modal__current-notification'
                  key={currentNotification.notificationId}
                >
                  <img
                    src={
                      currentNotification.notificationUserPhoto
                        ? currentNotification.notificationUserPhoto
                        : './photos/usersAvatar/emptyAvatar.jpg'
                    }
                    alt='notification'
                    width='40'
                    height='40'
                    className='avatar'
                  />
                  <div>
                    <div className='post-author'>
                      <div className='text author current-notification__author'>
                        {currentNotification.notificationUserName}
                      </div>
                      <time
                        className='disabled-text post-author__disabled-text'
                        datatime={currentNotification.createdAt}
                      >
                        {dateOfNoitfication.toLocaleString()}
                      </time>
                    </div>

                    <p className='text current-notification__text'>
                      {currentNotification.notificationText}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {isAllNotificationShow ? (
            <button disabled className='subtitle modal__show-all'>
              Latest notifications shown
            </button>
          ) : (
            <button
              disabled={isAllNotificationShow}
              onClick={getAllNotification}
              className='subtitle show-all modal__show-all'
            >
              Show all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
