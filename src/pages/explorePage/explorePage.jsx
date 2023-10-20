import React from 'react';
import './explorePage.css';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import SearchPanel from "@/components/searchPanel/searchPanel";

const ExplorePage = () => {
  return (
    <section>
      <SearchPanel/>
      <div className='filtered-news'>
        <ContentFilter />
        <AllNews />
      </div>
    </section>
  );
};

export default ExplorePage;
