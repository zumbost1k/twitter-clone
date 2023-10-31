import React from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import SearchPanel from '@/components/searchPanel/searchPanel';
import { useSelector } from 'react-redux';
import { selectallNews } from '@/selectors/selectors';
const ExplorePage = () => {
  const allNews = useSelector(selectallNews);

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
          <AllNews isUserPage={false} allNews={allNews} />
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
