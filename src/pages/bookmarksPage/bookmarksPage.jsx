import React, { useEffect, useState } from 'react';
import './bookmarksPage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
// import { useSelector } from 'react-redux';
// import { selectallNews } from '@/selectors/selectors';
import { useSavedTweets } from '@/hooks/use-savedTweets';

const BookmarksPage = () => {
  const [bookMaksNews, setbookMaksNews] = useState(null);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const fetchAndSetTweets = useSavedTweets();
  useEffect(() => {
    if (isShouldFetch) {
      fetchAndSetTweets()
        .then((reversedData) => {
          setIsShouldFetch(false);
          setbookMaksNews(reversedData);
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
    }
  }, [fetchAndSetTweets, isShouldFetch]);
  if (!bookMaksNews) {
    return;
  }
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
