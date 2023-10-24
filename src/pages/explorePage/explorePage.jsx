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
        <AllNews isUserPage={false} allNews={allNews} />
      </div>
    </section>
  );
};

export default ExplorePage;
