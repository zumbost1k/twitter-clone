import React from 'react';
import './homePage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import ContentFilter from '@/components/contentFilter/contentFilter';

const HomePage = () => {
  return (
    <section>
      <ProfileHeader />
      <div className='filtered-news'>
        <ContentFilter />
      </div>
    </section>
  );
};

export default HomePage;
