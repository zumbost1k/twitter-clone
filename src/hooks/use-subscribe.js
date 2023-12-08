import { useState, useCallback, useEffect } from 'react';

export const useSubscribe = (userId) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isSubscribe, setIsSubscribe] = useState(false);
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
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Follower/Subscribe${userId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (!response.ok) {
      setIsSubscribe(true);
      setShouldFetch(false);
    } else if (response.ok && shouldFetch) {
      unsubscribe();
      setShouldFetch(false);
    } else if (response.ok && !shouldFetch) {
      setIsSubscribe(true);
    }
  }, [shouldFetch, userId, unsubscribe]);

  useEffect(() => {
    if (shouldFetch) {
      subscribe();
    }
  }, [subscribe, shouldFetch]);
  //isSubscribe displays whether the current user is subscribed to another user
  //If the status code is 400, the user is already subscribed to the user. If it is 200,
  // the user is not subscribed yet and has subscribed using the request, so the system throws an unsubscribe request.
  // subscribe and unsabscribe are functions for subscribe and unsubscribe on users
  return { isSubscribe, subscribe, unsubscribe };
};
