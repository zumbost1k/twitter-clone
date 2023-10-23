import React from 'react';
import './userPage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';

const UserPage = () => {
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
        <AllNews />
      </div>
    </section>
  );
};

export default UserPage;
