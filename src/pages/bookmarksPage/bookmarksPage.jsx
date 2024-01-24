import React, { useEffect, useState } from 'react';
import './bookmarksPage.css';
import AllNews from '@/components/allNews/allNews';
import { useSavedTweets } from '@/hooks/use-savedTweets';
import Loader from '@/UI/loader/loader';

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
    return <Loader />;
  }
  return (
    <section className='bookmarks-page-section'>
      <div className='filtered-news'>
        {!bookMaksNews.length ? (
          <p className='common-text bookmarks-page-section__common-text'>
            No posts have been saved
          </p>
        ) : (
          <AllNews isUserPage={false} allNews={bookMaksNews} />
        )}
      </div>
    </section>
  );
};

export default BookmarksPage;
