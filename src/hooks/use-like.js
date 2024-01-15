import { useState } from 'react';

export const useLike = (postId, isLikedInitianally) => {
  const [isLiked, setisLiked] = useState(isLikedInitianally);

  const unLike = async () => {
    const responce = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Like/DeleteTweetFromLiked${postId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );

    if (responce.ok) {
      setisLiked(false);
    }
  };
  const like = async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Like/AddTweetInLiked${postId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (response.ok) {
      setisLiked(true);
    }
  };

  return { isLiked, like, unLike };
};
