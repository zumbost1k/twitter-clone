import React from 'react';
import './bookmarksPage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';

const BookmarksPage = () => {
  const bookMaksNews = useSelector(selectallNews);
  return (
    <section>
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
        <AllNews isUserPage={false} allNews={bookMaksNews} />
      </div>
    </section>
  );
};

export default BookmarksPage;
