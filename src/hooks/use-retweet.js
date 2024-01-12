import { useState, useCallback } from 'react';

export const useRetweet = (postId, isRetweetedInitiall) => {
  const [isRetweeted, setIsRetweeted] = useState(isRetweetedInitiall);
  const unRetweet = useCallback(async () => {
    const responce = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Retweet/DeleteTweetFromRetweet${postId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (responce.ok) {
      setIsRetweeted(false);
    }
  }, [postId]);
  const retweet = useCallback(async () => {
    const responce = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Retweet/AddTweetInRetweets${postId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (responce.ok) {
      setIsRetweeted(true);
    }
  }, [postId]);

  return { isRetweeted, retweet, unRetweet };
};
