import React, { useState } from 'react';
import './newsItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectallUserPage, selectCurrentUser } from '@/selectors/selectors';
import Message from '@/icons/message';
import Bookmark from '@/icons/bookmark';
import Heart from '@/icons/heart';
import Reboot from '@/icons/reboot';
import Send from '@/icons/send';
import { Link } from 'react-router-dom';
import { changeCurrentUserPage } from '@/slices/allUsersSlice';
const postButtons = [
  {
    name: 'Comment',
    icon: <Message width={'20'} height={'20'} />,
    activeText: 'Comment',
    activeClass: 'grey-text',
  },
  {
    name: 'Retweet',
    icon: <Reboot width={'20'} height={'20'} />,
    activeText: 'Retweeted',
    activeClass: 'green-text',
  },
  {
    name: 'Like',
    icon: <Heart width={'20'} height={'20'} />,
    activeText: 'Liked',
    activeClass: 'red-text',
  },
  {
    name: 'Save',
    icon: <Bookmark width={'20'} height={'20'} />,
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
  const dispatch = useDispatch();
  const interactionToolClick = (buttonName) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
    if (buttonName === 'Comment' + currentNews.postId) {
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

  const setCurrentUserHandle = () => {
    dispatch(changeCurrentUserPage(postAuthor.userId));
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
          <Link
            onClick={setCurrentUserHandle}
            to={`/user/${postAuthor.userId}`}
            className='text post-author__text'
          >
            {postAuthor.userName}
          </Link>
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
                htmlFor={currentButton.name + currentNews.postId}
                key={currentButton.name + currentNews.postId}
                className={
                  activeButtons[currentButton.name + currentNews.postId]
                    ? `interaction-tool buttons__interaction-tool ${currentButton.activeClass}`
                    : 'interaction-tool buttons__interaction-tool'
                }
              >
                <button
                  className='send'
                  id={currentButton.name + currentNews.postId}
                  onClick={() =>
                    interactionToolClick(
                      currentButton.name + currentNews.postId
                    )
                  }
                >
                  {currentButton.icon}
                </button>
                <p
                  className={
                    activeButtons[currentButton.name]
                      ? `text interaction-tool__text ${currentButton.activeClass}`
                      : `text interaction-tool__text`
                  }
                >
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
              src={`./photos/usersAvatar/${currentUserInfo.profileAvatar}`}
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
                className='input form__input'
              />
              <button onClick={sendComment} type='sumbit' className='send'>
                <Send width={'20'} height={'20'} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsItem;
