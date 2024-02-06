import React, { useEffect, useRef, useState } from 'react';
import './notification.css';
import Bell from '@/icons/bell';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { format } from 'numerable';

const Notification = () => {
  const { userId } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [currentNotifications, setCurrentNotification] = useState(null);
  const [isAllNotificationShow, setIsAllNotificationShow] = useState(false);
  const modalRef = useRef();
  const location = useLocation();

  useEffect(() => {
    fetch(
      'https://twittercloneapiproductionenv.azurewebsites.net/Notification/GetUnreadNotifications',
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentNotification(data.data);
      });
  }, [location.pathname]);

  const updateNotification = async (nitificationsIds) => {
    fetch(
      'https://twittercloneapiproductionenv.azurewebsites.net/Notification/UpdateNotifications',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...nitificationsIds]),
        method: 'PUT',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const newNotificationsState = currentNotifications.map(
          (notification) => {
            const newNotification = data.data.find(
              (newNote) =>
                newNote.notificationId === notification.notificationId
            );
            return newNotification || notification;
          }
        );
        setCurrentNotification(newNotificationsState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLastNotification = () => {
    const notificationsToUpdateState = currentNotifications
      .slice(0, 3)
      .map((currentNotification) => currentNotification.notificationId);
    updateNotification(notificationsToUpdateState).then(() => {
      setShowModal(true);
      setIsAllNotificationShow(false);
    });
  };

  const getAllNotification = () => {
    const notificationsToUpdateState = currentNotifications
      .slice(0, 6)
      .map((currentNotification) => currentNotification.notificationId);
    updateNotification(notificationsToUpdateState).then((responce) => {
      setIsAllNotificationShow(true);
    });
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

  if (!currentNotifications) {
    return;
  }

  return (
    <div ref={modalRef} className='notification relative'>
      <button
        onClick={getLastNotification}
        className='bell notification__bell relative'
      >
        <Bell width={'32'} height={'32'} />
        {
          <span className='unread-notificaton bell__unread-notificaton'>
            {format(
              currentNotifications.reduce(
                (quantityOfUnreaded, currentQuantity) =>
                  quantityOfUnreaded + !currentQuantity.isRead,
                0
              ),
              '0a'
            )}
          </span>
        }
      </button>

      {showModal && (
        <div className='container modal notification__modal'>
          <h3 className='subtitle subtitle__modal'>Your page notification</h3>
          <div>
            {currentNotifications
              .slice(0, isAllNotificationShow ? 6 : 3)
              .map((currentNotification) => {
                const dateOfNoitfication = new Date(
                  currentNotification.createdAt
                );
                return (
                  <Link
                    to={
                      userId === currentNotification.sourseUserId
                        ? '/user/currentUser'
                        : `/user/${currentNotification.sourseUserId}`
                    }
                    className='current-notification modal__current-notification'
                    key={currentNotification.notificationId}
                  >
                    <img
                      src={
                        currentNotification.sourseUserImage
                          ? currentNotification.sourseUserImage
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
                          {currentNotification.sourseUserName}
                        </div>
                        <time
                          className='disabled-text post-author__disabled-text'
                          datatime={currentNotification.createdAt}
                        >
                          {dateOfNoitfication.toLocaleString()}
                        </time>
                      </div>

                      <p className='text current-notification__text'>
                        {currentNotification.notificationType}
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
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
