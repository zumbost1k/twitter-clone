import Heart from '@/icons/heart';
import { useState } from 'react';
import './likeButton.css';

const Likebutton = ({ commentId, isLikedInitianally }) => {
  const [isLiked, setIsLiked] = useState(isLikedInitianally);
  const LikedCommentHandler = () => {
    const likeComment = () => {
      fetch(
        `https://twittercloneapiproductionenv.azurewebsites.net/Like/AddTweetInLiked${commentId}`,
        {
          method: 'GET',
          credentials: 'include',
          withCredentials: true,
          crossorigin: true,
        }
      ).then(() => {
        setIsLiked(false);
      });
    };
    const unlikeComment = () => {
      fetch(
        `https://twittercloneapiproductionenv.azurewebsites.net/Like/DeleteTweetFromLiked${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          withCredentials: true,
          crossorigin: true,
        }
      ).then(() => {
        setIsLiked(true);
      });
    };
    isLiked ? unlikeComment() : likeComment();
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

export default Likebutton;
