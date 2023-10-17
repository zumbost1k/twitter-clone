import React from 'react';
import './newsItem.css';
import { useSelector } from 'react-redux';
import { selectallUserPage } from '@/selectors/selectors';

const NewsItem = ({ currentNews }) => {
  const allUsers = useSelector(selectallUserPage);
  const postAuthor = allUsers.find((currentUser) => {
    return currentUser.userName === currentNews.authorName;
  });
  console.log(postAuthor);
  return (
    <div className='container'>
      <div>
        <img
          className='avatar'
          src={`./photos/usersAvatar/${postAuthor.profileAvatar}`}
          alt='avatar'
          width='40'
          height='40'
        />
        <div>
          <p>{postAuthor.userName}</p>
          <time className='common-text' dateTime={currentNews.creationDate}>
            {currentNews.creationDate}
          </time>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
