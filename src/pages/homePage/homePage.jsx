import React, { useCallback, useEffect, useState } from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';
import { useAllTweets } from '@/hooks/use-allTweets';
import Loader from '@/UI/loader/loader';
import { useTopHashtags } from '@/hooks/use-topHashtags';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const hashtag = new URLSearchParams(location.search).get('hashtag');
  const [homePageNews, setHomePageNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const [isShouldFetchHashtags, setIsShouldFetchHashtags] = useState(true);
  const [hashtags, setHashtags] = useState(null);
  const fetchAndSetTweets = useAllTweets();
  const fetchHashtags = useTopHashtags();
  const addHomePageNewsHandler = (post) => {
    const newHomePageNews = [post, ...homePageNews];
    setHomePageNews(newHomePageNews);
  };

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          300 &&
        hasNextPage
      ) {
        setCurrentPage(currentPage + 1);
        setIsShouldFetch(true);
      }
    },
    [currentPage, hasNextPage]
  );

  useEffect(() => {
    setCurrentPage(1);
    setIsShouldFetch(true);
  }, [hashtag]);

  useEffect(() => {
    if (isShouldFetch) {
      fetchAndSetTweets(hashtag, currentPage)
        .then((responce) => {
          const paginaton = JSON.parse(responce.headers.get('X-Pagination'));
          setHasNextPage(paginaton.HasNext);
          return responce.json();
        })
        .then((reversedData) => {
          if (hashtag || currentPage === 1) {
            setIsShouldFetch(false);
            setHomePageNews(reversedData.reverse());
          } else {
            setIsShouldFetch(false);
            setHomePageNews((prev) => [...prev, ...reversedData.reverse()]);
          }
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
    }
  }, [fetchAndSetTweets, isShouldFetch, hashtag, currentPage]);

  useEffect(() => {
    if (isShouldFetchHashtags) {
      fetchHashtags().then((data) => {
        setHashtags(data);
        setIsShouldFetchHashtags(false);
      });
    }
  }, [fetchHashtags, isShouldFetchHashtags]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  if (!homePageNews || !hashtags) {
    return <Loader />;
  }
  return (
    <section className='home-page'>
      <div>
        <AddNews addHomePageNewsHandler={addHomePageNewsHandler} />
        {!homePageNews.length ? (
          <p className='common-text bookmarks-page-section__common-text'>
            No posts have been written yet
          </p>
        ) : (
          <AllNews isUserPage={false} allNews={homePageNews} />
        )}
      </div>
      <div className='trends'>
        <HashtagFilter hashtags={hashtags} />
        <UsersToFollow />
      </div>
    </section>
  );
};

export default HomePage;
