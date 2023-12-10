import { useState, useCallback, useEffect } from 'react';

export const useRetweet = (postId) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const unRetweet = useCallback(async () => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Retweet/RemoveTweetFromSaved?tweetId=${postId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    ).then((responce) => {
      if (responce.ok) {
        setIsRetweeted(false);
      }
    });
  }, [postId]);
  const retweet = useCallback(async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Retweet/AddTweetInRetweets${postId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (!response.ok) {
      setIsRetweeted(true);
      setShouldFetch(false);
    } else if (response.ok && shouldFetch) {
      unRetweet();
      setShouldFetch(false);
    } else if (response.ok && !shouldFetch) {
      setIsRetweeted(true);
    }
  }, [shouldFetch, postId, unRetweet]);

  useEffect(() => {
    if (shouldFetch) {
      retweet();
    }
  }, [retweet, shouldFetch]);

  return { isRetweeted, retweet, unRetweet };
};
