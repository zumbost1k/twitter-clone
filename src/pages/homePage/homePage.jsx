import React, { useEffect, useState } from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';
import { setTweets } from '../../slices/allPostsSlice';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const [homePageNews, setHomePageNews] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetAllTweets`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTweets(data.data));
        setHomePageNews(data.data);
      });
  }, [dispatch]);

  if (homePageNews) {
    return (
      <section className='home-page'>
        <div>
          <AddNews />
          <AllNews isUserPage={false} allNews={homePageNews} />
        </div>
        <div className='trends'>
          <HashtagFilter />
          <UsersToFollow />
        </div>
      </section>
    );
  }
};

export default HomePage;
