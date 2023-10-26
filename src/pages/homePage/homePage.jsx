import React from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';

const HomePage = () => {
  const homePageNews = useSelector(selectallNews);
  return (
    <section className='home-page'>
      <AddNews />
      <AllNews isUserPage={false} allNews={homePageNews}/>
    </section>
  );
};

export default HomePage;