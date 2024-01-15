export const useAllTweets = () => {
  const fetchAndSetTweets = async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetAllTweets`,
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
