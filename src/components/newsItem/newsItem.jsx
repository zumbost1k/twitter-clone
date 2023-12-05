import React, { useCallback, useEffect, useState } from 'react';
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
import { setPostAuthor } from '../../slices/postAuthorSlice';
import { selectPostAuthor } from '../../selectors/selectors';
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
  // const allUsers = useSelector(selectallUserPage);
  const [answerText, setAnswerText] = useState('');
  const currentUserInfo = useSelector(selectCurrentUser);
  const [postAuthor, setPostAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const postAuthor = useSelector(selectPostAuthor);
  // const postAuthor = allUsers.find((currentUser) => {
  //   return currentUser.userName === currentNews.authorName;
  // });
  const dispatch = useDispatch();
  const getPostAuthorById = useCallback(async () => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetUserProfileById${currentNews.postedUserId}`,
      {
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((json) => {
        json.json();
      })
      .then((data) => setPostAuthor(data))
      .then(() => {
        setIsLoading(false);
      });
    // const responseData = await response.json();
    // dispatch(setPostAuthor(responseData.data));
    // console.log(responseData.data);
  }, [dispatch]);

    getPostAuthorById().catch((error) => {
      console.error(error);
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

  const setCurrentUserHandle = () => {
    dispatch(changeCurrentUserPage(postAuthor.userId));
  };
  if (!isLoading) {
    return (
      <div className='container news-container'>
        <div className='news-body container__news-body'>
          <img
            className='avatar news-body__avatar'
            src={postAuthor.profileAvatar}
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
              datatime={currentNews.createdAt}
            >
              {currentNews.createdAt}
            </time>
          </div>
          <p className='text news-body__text'>{currentNews.content}</p>
          {currentNews.image && (
            <img
              className='post-picture news-body__post-picture'
              src={currentNews.image}
              alt='post'
            />
          )}
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
                src={currentUserInfo.profileAvatar}
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
  }
};

export default NewsItem;
