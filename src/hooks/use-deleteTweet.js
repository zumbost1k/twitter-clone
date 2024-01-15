export default UseDeleteTweet = (tweetId) => {
  const deletePost = () => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/DeleteTweetById${tweetId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
  };
  return deletePost;
};
