import React, { useEffect, useState } from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import SearchPanel from '@/components/searchPanel/searchPanel';
import Loader from '@/UI/loader/loader';
import { useExploreTweets } from '@/hooks/use-exploreTweets';
import { useDispatch, useSelector } from 'react-redux';
import { setExplorePageNews } from '../../slices/explorePageNewsSlice';
import { selectExplorePageNews } from '../../selectors/selectors';

const ExplorePage = () => {
  const [exploreNews, setexploreNews] = useState(null);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const fetchAndSetTweets = useExploreTweets();
  const dispatch = useDispatch();
  const currentExploreNews = useSelector(selectExplorePageNews);
  // useEffect(() => {
  //   if (isShouldFetch) {
  //     fetchAndSetTweets()
  //       .then((reversedData) => {
  //         setIsShouldFetch(false);
  //         setexploreNews(reversedData);
  //       })
  //       .catch((error) => {
  //         console.error('Failed to load tweets:', error);
  //       });
  //   }
  // }, [fetchAndSetTweets, isShouldFetch]);

  const getExplorePageNews = async (filter) => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetTweetsByParams?page=${filter}`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((responce) => {
       return responce.json();
      })
      .then((data) => {
        dispatch(setExplorePageNews(data.data));
      })
      .then(() => {
        setexploreNews(currentExploreNews);
      })
      .catch((error) => {
        console.error('Failed to load tweets:', error);
      });
  };

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
