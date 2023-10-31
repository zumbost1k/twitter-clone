import React from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';

const HomePage = () => {
  const homePageNews = useSelector(selectallNews);
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
};

export default HomePage;
