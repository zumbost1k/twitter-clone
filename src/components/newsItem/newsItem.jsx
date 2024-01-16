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
import TripletButton from '@/UI/tripletButton/tripletButton';
import { useAuth } from '@/hooks/use-auth';
import { useLike } from '@/hooks/use-like';
import { useSave } from '@/hooks/use-save';
import Loader from '@/UI/loader/loader';
import Arrow from '@/icons/arrow';
import PhotoUpload from '@/icons/photo';
import Trash from '@/icons/trash';
import Edit from '@/icons/edit';

const Likebutton = ({ commentId, isLikedInitianally }) => {
  const [isLiked, setIsLiked] = useState(isLikedInitianally);
  const LikedCommentHandler = () => {
    setIsLiked(!isLiked);
  };
  return (
    <button
      onClick={LikedCommentHandler}
      className={`like-btn ${
        isLiked ? 'like-btn_active' : 'like-btn_disabled'
      }`}
    >
      <Heart width={'16'} height={'16'} />
      <span>{isLiked ? 'Liked' : 'Like'}</span>
    </button>
  );
};

const comments = [
  {
    commentId: 8,
    posterUserId: 3,
    content: 'this is a test comment',
    image:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/16.01.2024.12.12.24.575331.png',
    createdAt: '2024-01-16T12:12:24.5925043',
    updatedAt: '2024-01-16T12:12:24.5925055',
    isOwner: true,
    profilePicture:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    quantityOfLikes: 8,
    fullName: 'misha',
    isLiked: false,
  },
  {
    commentId: 9,
    posterUserId: 3,
    content: 'this is a test comment for checking',
    image:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/16.01.2024.12.22.12.081435.png',
    createdAt: '2024-01-16T12:22:12.093417',
    updatedAt: '2024-01-16T12:22:12.0934184',
    isOwner: true,
    profilePicture:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    quantityOfLikes: 0,
    fullName: 'misha',
    isLiked: false,
  },
  {
    commentId: 10,
    posterUserId: 3,
    content: 'this is a comment without photo',
    image: '',
    createdAt: '2024-01-16T12:23:10.255165',
    updatedAt: '2024-01-16T12:23:10.255168',
    isOwner: false,
    profilePicture:
      'https://twittercloneapiproductionenv.azurewebsites.net/3/27.12.2023.08.46.47.714223.png',
    quantityOfLikes: 2,
    fullName: 'misha',
    isLiked: true,
  },
];

const NewsItem = ({ currentNews }) => {
  const { isRetweeted, retweet, unRetweet } = useRetweet(
    currentNews.tweetId,
    currentNews.isRetweeted
  );
  const { isLiked, like, unLike } = useLike(
    currentNews.tweetId,
    currentNews.isLiked
  );
  const { isSaved, save, unSave } = useSave(
    currentNews.tweetId,
    currentNews.isSaved
  );
  const { userId } = useAuth();
  const currentUserInfo = useSelector(selectCurrentUser);
  const [activeComment, setActiveComment] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [postAuthor, setPostAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentsShowing, setIsCommentsShowing] = useState(false);
  const [commentPhoto, setcommentPhoto] = useState(null);

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

  const sendComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Content', answerText);
    formData.append('Image', commentPhoto);

    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Comment/CreateComment${currentNews.tweetId}`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((data) => {
        setAnswerText('');
        setActiveComment(false);
        setcommentPhoto(null);
      })
      .catch((error) => {
        console.log('create comment error');
      });
  };
  if (isLoading) {
    return <Loader />;
  }

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

          <TripletButton
            tweetId={currentNews.tweetId}
            tripletButtons={[
              {
                text: 'Delete post',
                icon: <Trash width={'16'} height={'16'} />,
                functionKey: 'delete',
              },
              {
                text: 'Edit post',
                icon: <Edit width={'16'} height={'16'} />,
                functionKey: 'update',
              },
            ]}
            tripletFunctions={{
              delete: (tweetId) => {
                fetch(
                  `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/DeleteTweetById${tweetId}`,
                  {
                    method: 'DELETE',
                    credentials: 'include',
                    withCredentials: true,
                    crossorigin: true,
                  }
                );
              },
              update: (tweetId) => {
                console.log('hello update ' + tweetId);
              },
            }}
          />
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
            isChecked={isSaved}
            onClickFunction={isSaved ? unSave : save}
            buttonName={'save' + currentNews.tweetId}
            activeClass={'blue-text'}
            Text={isSaved ? 'Saved' : 'Save'}
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
              <label
                htmlFor='comment-photo'
                className='send-photo form__send-photo'
              >
                <input
                  onChange={(e) => {
                    if (e.target.files[0].size < 1 * 1000 * 1024) {
                      setcommentPhoto(e.target.files[0]);
                    }
                  }}
                  type='file'
                  id='comment-photo'
                  accept='image/,.png,.jpeg,.jpg'
                  style={{ display: 'none' }}
                />

                <PhotoUpload width={'20'} height={'20'} />
              </label>

              <button
                onClick={sendComment}
                type='sumbit'
                className='send form_send'
              >
                <Send width={'20'} height={'20'} />
              </button>
            </form>
          </div>
        )}
        <div className='comments-section news-body__comments-section'>
          {isCommentsShowing ? (
            <div className='comments comments-section__comments'>
              {comments.map((currentComment) => {
                const postCreatedAt = new Date(currentComment.createdAt);
                return (
                  <div className='comment' key={currentComment.id}>
                    <img
                      src={currentComment.profilePicture}
                      alt='avatar'
                      width='40'
                      height='40'
                      className='avatar'
                    />
                    <div className='content comment__content'>
                      <div className='comment__first-line'>
                        <div className='comment-author'>
                          <p className='text post-author__text'>
                            {currentComment.fullName}
                          </p>
                          <time
                            className='disabled-text post-author__disabled-text'
                            datatime={currentComment.createdAt}
                          >
                            {postCreatedAt.toLocaleString()}
                          </time>
                        </div>

                        {currentComment.isOwner && (
                          <TripletButton
                            tweetId={currentComment.commentId}
                            tripletButtons={[
                              {
                                text: 'Delete',
                                icon: <Trash width={'16'} height={'16'} />,
                                functionKey: 'delete',
                              },
                              {
                                text: 'Edit',
                                icon: <Edit width={'16'} height={'16'} />,
                                functionKey: 'update',
                              },
                            ]}
                            tripletFunctions={{
                              delete: (commentId) => {
                                fetch(
                                  `https://twittercloneapiproductionenv.azurewebsites.net/Comment/DeleteComment${commentId}`,
                                  {
                                    method: 'DELETE',
                                    credentials: 'include',
                                    withCredentials: true,
                                    crossorigin: true,
                                  }
                                );
                              },
                              update: (commentId) => {
                                console.log('hello update ' + commentId);
                              },
                            }}
                          />
                        )}
                      </div>
                      <p className='text comment__text'>
                        {currentComment.content}
                      </p>
                      {currentComment.image && (
                        <div>
                          <img
                            src={currentComment.image}
                            alt='comment'
                            width='400'
                            height='200'
                            className='post-picture content__post-picture'
                          />
                        </div>
                      )}
                      <div className='comment-likes content-comment__likes'>
                        <Likebutton
                          commentId={currentComment.commentId}
                          isLikedInitianally={currentComment.isLiked}
                        />
                        <p className='common-text comment-likes__commont-text'>
                          {currentComment.quantityOfLikes} Likes
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ''
          )}
          <div
            onClick={() => {
              setIsCommentsShowing(!isCommentsShowing);
            }}
            className='show-comments comments-section__show-comments'
          >
            {isCommentsShowing ? (
              <p className='common-text'>Hide comments</p>
            ) : (
              <p className='common-text'>Show comments</p>
            )}
            <div
              style={{
                transform: isCommentsShowing
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
              }}
              className='arrow show-comments__arrow'
            >
              <Arrow width={'24'} height={'28'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
