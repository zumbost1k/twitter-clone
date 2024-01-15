export const useExploreTweets = () => {
  const fetchAndSetTweets = async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Follower/GetFollowersTweets`,
      {
        method: 'GET',
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
