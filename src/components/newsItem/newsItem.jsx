import React from 'react';
import './newsItem.css';
import { useSelector } from 'react-redux';
import { selectallUserPage } from '@/selectors/selectors';
import Message from '@/icons/message';
import Bookmark from '@/icons/bookmark';
import Heart from '@/icons/heart';
import Reboot from '@/icons/reboot';
const postButtons = [
  {
    name: 'Comment',
    icon: <Message />,
    activeText: '',
    activeClass: '',
  },
  {
    name: 'Retweet',
    icon: <Reboot />,
    activeText: 'Retweeted',
    activeClass: 'green-text',
  },
  {
    name: 'Like',
    icon: <Heart />,
    activeText: 'Liked',
    activeClass: 'red-text',
  },
  {
    name: 'Save',
    icon: <Bookmark />,
    activeText: 'Saved',
    activeClass: 'blue-text',
  },
];
const NewsItem = ({ currentNews }) => {
  const allUsers = useSelector(selectallUserPage);
  const postAuthor = allUsers.find((currentUser) => {
    return currentUser.userName === currentNews.authorName;
  });
  return (
    <div className='container news-container'>
      <div className='news-body container__news-body'>
        <img
          className='avatar news-body__avatar'
          src={`./photos/usersAvatar/${postAuthor.profileAvatar}`}
          alt='avatar'
          width='40'
          height='40'
        />
        <div className='post-author news-body__post-author'>
          <p className='text post-author__text'>{postAuthor.userName}</p>
          <time
            className='disabled-text post-author__disabled-text'
            datatime={currentNews.creationDate}
          >
            {currentNews.creationDate}
          </time>
        </div>
        <p className='text news-body__text'>{currentNews.postText}</p>
        <img
          className='post-picture news-body__post-picture'
          src={`./photos/posts/${currentNews.postPhoto}`}
          alt='post'
        />
        <div className='media news-body__media'>
          <p className='disabled-text media__disabled-text'>
            {currentNews.quantityOfComments} Comments
          </p>
          <p className='disabled-text media__disabled-text'>
            {currentNews.quantityOfRetweets} Retweets
          </p>
          <p className='disabled-text media__disabled-text'>
            {currentNews.quantityOfSaved} Saved
          </p>
        </div>
        <div className='buttons news-body__buttons'>
          {postButtons.map((currentButton) => {
            return (
              <label
                htmlFor={currentButton.name}
                key={currentButton.name}
                className='interaction-tool buttons__interaction-tool'
              >
                <button
                  className='interaction-tool__button'
                  id={currentButton.name}
                >
                  {currentButton.icon}
                </button>
                <p className='text interaction-tool__text'>
                  {currentButton.name}
                </p>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
