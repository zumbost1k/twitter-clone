import React from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';
const HomePage = () => {
  const usersPageNews = useSelector(selectallNews);
  return (
    <section>
      <ProfileHeader />
      <div className='filtered-news'>
        <ContentFilter
          filterLinks={[
            {
              labelText: 'Tweets',
              id: 'tweets',
            },
            {
              labelText: 'Tweets & replies',
              id: 'replies',
            },
            {
              labelText: 'Media',
              id: 'media',
            },
            {
              labelText: 'Likes',
              id: 'likes',
            },
          ]}
        />
        <AllNews isUserPage={true} allNews={usersPageNews} />
      </div>
    </section>
  );
};

export default HomePage;
