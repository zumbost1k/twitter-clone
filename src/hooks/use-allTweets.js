export const useAllTweets = () => {
  const fetchAndSetTweets = async (hashtag, currentPage) => {
    console.log(hashtag);
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetAllTweets?PageNumber=${
        currentPage || 1
      }&PageSize=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          hashtags: JSON.stringify(hashtag ? '#' + hashtag : ''),
        },
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );

    return response;
  };

  return fetchAndSetTweets;
};
