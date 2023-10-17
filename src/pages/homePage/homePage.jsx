import React from 'react';
import './homePage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';

const HomePage = () => {
  return (
    <section>
      <ProfileHeader />
      <div className='filtered-news'>
        <ContentFilter />
        <AllNews />
      </div>
    </section>
  );
};

export default HomePage;
