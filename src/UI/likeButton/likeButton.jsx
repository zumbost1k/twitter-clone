import Heart from '@/icons/heart';
import { useState } from 'react';
import './likeButton.css';

const Likebutton = ({ commentId, isLikedInitianally }) => {
  const [isLiked, setIsLiked] = useState(isLikedInitianally);
  const LikedCommentHandler = () => {
    const likeComment = async () => {
      fetch(
        `https://twittercloneapiproductionenv.azurewebsites.net/CommentLike/AddLikeOnComment${commentId}`,
        {
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          crossorigin: true,
        }
      ).then(() => {
        setIsLiked(true);
      });
    };

    const unlikeComment = async () => {
      fetch(
        `https://twittercloneapiproductionenv.azurewebsites.net/CommentLike/DeleteLikeFromComment${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          withCredentials: true,
          crossorigin: true,
        }
      ).then(() => {
        setIsLiked(false);
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
