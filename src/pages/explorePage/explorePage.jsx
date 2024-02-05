import React, { useCallback, useEffect, useState } from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import SearchPanel from '@/components/searchPanel/searchPanel';
import Loader from '@/UI/loader/loader';

const ExplorePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exploreNews, setexploreNews] = useState([]);
  const [prevFilter, setPrevFilter] = useState('latest');

  const [totalTweetsCount, setTotalTweetsCount] = useState(0);
  const getExplorePageNews = useCallback(
    async (filter) => {
      fetch(
        `https://twittercloneapiproductionenv.azurewebsites.net/Follower/GetFollowersTweetsByParams?page=${filter}&PageNumber=${currentPage}&PageSize=10`,
        {
          method: 'GET',
          credentials: 'include',
          withCredentials: true,
          crossorigin: true,
        }
      )
        .then((responce) => {
          setPrevFilter(filter);
          setTotalTweetsCount(2);
          return responce.json();
        })
        .then((data) => {
          if (prevFilter === filter && currentPage !== 1) {
            setexploreNews((prev) => [...prev, ...data]);
          } else {
            setCurrentPage(1);
            setexploreNews(data);
          }
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
    },
    [currentPage, prevFilter]
  );

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          200 &&
        currentPage !== totalTweetsCount
      ) {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, totalTweetsCount]
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <section className='explore-page'>
      <div className='explore-filter'>
        <ContentFilter
          getNewsByFilter={getExplorePageNews}
          filterInitial={'latest'}
          filterLinks={[
            {
              labelText: 'Latest',
              id: 'latest',
            },
            {
              labelText: 'Top',
              id: 'top',
            },

            {
              labelText: 'Media',
              id: 'media',
            },
          ]}
        />
      </div>
      <div className='explore-news'>
        <div className='explore-search-panel'>
          <SearchPanel />
        </div>
        {!exploreNews ? (
          <Loader />
        ) : !exploreNews.length ? (
          <p className='common-text bookmarks-page-section__common-text'>
            No posts have been written yet
          </p>
        ) : (
          <div className='explore-all-news'>
            <AllNews isUserPage={false} allNews={exploreNews} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ExplorePage;
