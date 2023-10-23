import React from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
// import AllNews from '@/components/allNews/allNews';
import SearchPanel from '@/components/searchPanel/searchPanel';
const AllNews = React.lazy(() => import('@/components/allNews/allNews'));
const ExplorePage = () => {
  return (
    <section>
      <SearchPanel />
      <div className='filtered-news'>
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
        <React.Suspense fallback={<div>Loading...</div>}>
          <AllNews />
        </React.Suspense>
      </div>
    </section>
  );
};

export default ExplorePage;
