import React from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';

const HomePage = () => {
  const homePageNews = useSelector(selectallNews);
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
        <AllNews isUserPage={true} allNews={homePageNews} />
      </div>
    </section>
  );
};

export default HomePage;