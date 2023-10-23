import React from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import SearchPanel from '@/components/searchPanel/searchPanel';

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
        <AllNews isUserPage={false} />
      </div>
    </section>
  );
};

export default ExplorePage;
