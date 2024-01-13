import { useState } from 'react';

export const useRetweet = (postId, isRetweetedInitianally) => {
  const [isRetweeted, setIsRetweeted] = useState(isRetweetedInitianally);
  const unRetweet = async () => {
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
  };
  const retweet = async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Retweet/AddTweetInRetweets${postId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (response.ok) {
      setIsRetweeted(true);
    }
  };

  return { isRetweeted, retweet, unRetweet };
};
