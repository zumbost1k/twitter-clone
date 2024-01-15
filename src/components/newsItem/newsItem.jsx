import React, { useEffect, useState } from 'react';
import './newsItem.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/selectors/selectors';
import Message from '@/icons/message';
import Bookmark from '@/icons/bookmark';
import Heart from '@/icons/heart';
import Reboot from '@/icons/reboot';
import Send from '@/icons/send';
import { Link } from 'react-router-dom';
import { useRetweet } from '@/hooks/use-retweet';
import NewsItemButton from '@/UI/newsItemButton/newsItemButton';
import TripletButton from '../tripletButton/tripletButton';
import { useAuth } from '@/hooks/use-auth';
import { useLike } from '@/hooks/use-like';

const NewsItem = ({ currentNews }) => {
  const { isRetweeted, retweet, unRetweet } = useRetweet(
    currentNews.tweetId,
    currentNews.isRetweeted
  );
  const { isLiked, like, unLike } = useLike(
    currentNews.tweetId,
    currentNews.isLiked
  );
  const { userId } = useAuth();
  const [activeComment, setActiveComment] = useState(false);
  const [activeSave, setActiveSave] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const currentUserInfo = useSelector(selectCurrentUser);
  const [postAuthor, setPostAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const postCreatedAt = new Date(currentNews.createdAt);

  useEffect(() => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetUserProfileById${currentNews.postedUserId}`,
      { method: 'GET' }
    )
      .then((responce) => responce.json())
      .then((data) => {
        setPostAuthor(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentNews.postedUserId]);

  const onClickCommentHandle = (tweetId) => {
    setActiveComment(!activeComment);
  };

  const onClickSaveHandle = (tweetId) => {
    setActiveSave(!activeSave);
  };

  const sendComment = (e) => {
    if (answerText.length !== 0) {
      e.preventDefault();
      setAnswerText('');
      setActiveComment(false);
    }
  };

  if (!isLoading) {
    return (
      <div className='container news-container'>
        <div className='news-body container__news-body'>
          <div className='flex-between-center news-body__flex-between-center'>
            <div className='flex-between-center'>
              <img
                className='avatar news-body__avatar'
                src={
                  postAuthor.profilePicture ||
                  './photos/usersAvatar/emptyAvatar.jpg'
                }
                alt='avatar'
                width='40'
                height='40'
              />
              <div className='post-author news-body__post-author'>
                <Link
                  to={`/user/${
                    userId === postAuthor.userId
                      ? 'currentUser'
                      : postAuthor.userId
                  }`}
                  className='text post-author__text'
                >
                  {postAuthor.fullName
                    ? postAuthor.fullName
                    : postAuthor.userName}
                </Link>
                <time
                  className='disabled-text post-author__disabled-text'
                  datatime={currentNews.createdAt}
                >
                  {postCreatedAt.toLocaleString()}
                </time>
              </div>
            </div>

            <TripletButton tweetId={currentNews.tweetId} />
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
              {currentNews.commentsCount} Comments
            </p>
            <p className='disabled-text media__disabled-text'>
              {currentNews.retweetCount} Retweets
            </p>
            <p className='disabled-text media__disabled-text'>
              {currentNews.saveCount} Saved
            </p>
          </div>
          <div className='buttons news-body__buttons'>
            <NewsItemButton
              icon={<Message width={'20'} height={'20'} />}
              tweetId={currentNews.tweetId}
              isChecked={activeComment}
              onClickFunction={onClickCommentHandle}
              buttonName={'comment' + currentNews.tweetId}
              activeClass={'grey-text'}
              Text={'Comment'}
            />

            <NewsItemButton
              icon={<Reboot width={'20'} height={'20'} />}
              tweetId={currentNews.tweetId}
              isChecked={isRetweeted}
              onClickFunction={isRetweeted ? unRetweet : retweet}
              buttonName={'retweet' + currentNews.tweetId}
              activeClass={'green-text'}
              Text={isRetweeted ? 'Retweeted' : 'Retweet'}
            />
            <NewsItemButton
              icon={<Heart width={'20'} height={'20'} />}
              tweetId={currentNews.tweetId}
              isChecked={isLiked}
              onClickFunction={isLiked ? unLike : like}
              buttonName={'like' + currentNews.tweetId}
              activeClass={'red-text'}
              Text={isLiked ? 'Liked' : 'Like'}
            />
            <NewsItemButton
              icon={<Bookmark width={'20'} height={'20'} />}
              tweetId={currentNews.tweetId}
              isChecked={activeSave}
              onClickFunction={onClickSaveHandle}
              buttonName={'save' + currentNews.tweetId}
              activeClass={'blue-text'}
              Text={activeSave ? 'Saved' : 'Save'}
            />
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
