export const useSavedTweets = () => {
  const fetchAndSetTweets = async (currentPage) => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/SavedTweet/GetSavedTweets?PageNumber=${currentPage}&PageSize=10`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    return response;
  };

  return fetchAndSetTweets;
};
