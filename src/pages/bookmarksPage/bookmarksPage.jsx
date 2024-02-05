import React, { useCallback, useEffect, useState } from 'react';
import './bookmarksPage.css';
import AllNews from '@/components/allNews/allNews';
import { useSavedTweets } from '@/hooks/use-savedTweets';
import Loader from '@/UI/loader/loader';

const BookmarksPage = () => {
  const [bookMaksNews, setbookMaksNews] = useState([]);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchAndSetTweets = useSavedTweets();
  useEffect(() => {
    if (isShouldFetch) {
      fetchAndSetTweets(currentPage)
        .then((responce) => {
          return responce.json();
        })
        .then((reversedData) => {
          if (currentPage !== 1) {
            setIsShouldFetch(false);
            setbookMaksNews((prev) => [...prev, ...reversedData.reverse()]);
          } else {
            setIsShouldFetch(false);
            setbookMaksNews(reversedData.reverse());
          }
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
    }
  }, [fetchAndSetTweets, isShouldFetch, currentPage]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          200 &&
        false
      ) {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

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
