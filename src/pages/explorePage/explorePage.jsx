import React, { useEffect, useState } from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import SearchPanel from '@/components/searchPanel/searchPanel';
import Loader from '@/UI/loader/loader';
import { useExploreTweets } from '@/hooks/use-exploreTweets';

const ExplorePage = () => {
  const [exploreNews, setexploreNews] = useState(null);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const fetchAndSetTweets = useExploreTweets();
  useEffect(() => {
    if (isShouldFetch) {
      fetchAndSetTweets()
        .then((reversedData) => {
          setIsShouldFetch(false);
          setexploreNews(reversedData);
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
    }
  }, [fetchAndSetTweets, isShouldFetch]);
  if (!exploreNews) {
    return <Loader />;
  }

  return (
    <section className='explore-page'>
      <div className='explore-filter'>
        <ContentFilter
          filterLinks={[
            {
              labelText: 'Top',
              id: 'top',
            },
            {
              labelText: 'Lastest',
              id: 'lastest',
            },
            {
              labelText: 'People',
              id: 'people',
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
        <div className='explore-all-news'>
          <AllNews isUserPage={false} allNews={exploreNews} />
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
