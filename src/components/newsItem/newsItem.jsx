import React, { useState } from 'react';
import './newsItem.css';
import { useSelector } from 'react-redux';
import { selectallUserPage, selectCurrentUser } from '@/selectors/selectors';
import Message from '@/icons/message';
import Bookmark from '@/icons/bookmark';
import Heart from '@/icons/heart';
import Reboot from '@/icons/reboot';
import Send from '@/icons/send';
const postButtons = [
  {
    name: 'Comment',
    icon: <Message />,
    activeText: 'Comment',
    activeClass: 'grey-text',
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
  const [activeButtons, setActiveButtons] = useState({});
  const [activeComment, setActiveComment] = useState(false);
  const allUsers = useSelector(selectallUserPage);
  const [answerText, setAnswerText] = useState('');
  const currentUserInfo = useSelector(selectCurrentUser);
  const postAuthor = allUsers.find((currentUser) => {
    return currentUser.userName === currentNews.authorName;
  });
  const interactionToolClick = (buttonName) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
    if (buttonName === 'Comment') {
      setActiveComment(!activeComment);
    }
  };
  const sendComment = (e) => {
    if (answerText.length !== 0) {
      e.preventDefault();
      setAnswerText('');
      setActiveComment(false);
      setActiveButtons((prevState) => ({
        ...prevState,
        Comment: false,
      }));
    }
  };
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
                className={
                  activeButtons[currentButton.name]
                    ? `interaction-tool buttons__interaction-tool ${currentButton.activeClass}`
                    : 'interaction-tool buttons__interaction-tool'
                }
              >
                <button
                  className='send'
                  id={currentButton.name}
                  onClick={() => interactionToolClick(currentButton.name)}
                >
                  {currentButton.icon}
                </button>
                <p className='text interaction-tool__text'>
                  {activeButtons[currentButton.name]
                    ? currentButton.activeText
                    : currentButton.name}
                </p>
              </label>
            );
          })}
        </div>
        {activeComment && (
          <div className='comment-body news-body__comment-body'>
            <img
              className='avatar'
              src={`./photos/usersAvatar/${currentUserInfo.userAvatar}`}
              alt='current user avatar'
              width='40'
              height='40'
            />
            <form className='form comment-body__form'>
              <input
                value={answerText}
                onChange={(e) => {
                  setAnswerText(e.target.value);
                }}
                type='text'
                id='comment'
                required
                placeholder='Tweet your reply'
                className='input'
              />
              <button onClick={sendComment} type='sumbit' className='send'>
                <Send />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsItem;
