import React from 'react';
import './userPage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';

const UserPage = () => {
  const userPageNews = useSelector(selectallNews);
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
        <AllNews isUserPage={true} allNews={userPageNews}/>
      </div>
    </section>
  );
};

export default UserPage;
