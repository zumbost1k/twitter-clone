export const useTopHashtags = () => {
  const fetchHashtags = async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Hashtag/GetTopHashtags`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    const data = await response.json();
    return data.data;
  };

  return fetchHashtags;
};
