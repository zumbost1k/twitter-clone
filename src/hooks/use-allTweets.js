export const useAllTweets = () => {
  const fetchAndSetTweets = async (hashtag) => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetAllTweets`,
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
    const data = await response.json();
    const reversedData = [...data.data].reverse();
    return reversedData;
  };

  return fetchAndSetTweets;
};
