import { useDispatch } from 'react-redux';
import { setTweets } from '../slices/allPostsSlice';

export const useAllTweets = () => {
  const dispatch = useDispatch();

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
    dispatch(setTweets(reversedData));
    return reversedData;
  };

  return fetchAndSetTweets;
};
