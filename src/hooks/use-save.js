import { useState } from 'react';

export const useSave = (postId, isSavedInitianally) => {
  const [isSaved, setisSaved] = useState(isSavedInitianally);

  const unSave = async () => {
    const responce = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/SavedTweet/DeleteTweetFromSaved${postId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );

    if (responce.ok) {
      setisSaved(false);
    }
  };
  const save = async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/SavedTweet/AddTweetInSaved${postId}`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (response.ok) {
      setisSaved(true);
    }
  };

  return { isSaved, save, unSave };
};
