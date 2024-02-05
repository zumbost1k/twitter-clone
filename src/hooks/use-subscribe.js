import { useState, useCallback } from 'react';

export const useSubscribe = (userId, isSubscribeInitianally) => {
  const [isSubscribe, setIsSubscribe] = useState(isSubscribeInitianally);
  const unsubscribe = useCallback(async () => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Follower/Unsubscribe${userId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    ).then((responce) => {
      if (responce.ok) {
        setIsSubscribe(false);
      }
    });
  }, [userId]);
  const subscribe = useCallback(async () => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Follower/Subscribe${userId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    ).then((responce) => {
      if (responce.ok) {
        setIsSubscribe(false);
      }
    });
  }, [userId]);

  return { isSubscribe, subscribe, unsubscribe };
};
