import React from 'react';
import './allNews.css';
import NewsItem from '@/components/newsItem/newsItem.jsx';
import { v4 } from 'uuid';
const AllNews = ({ allNews }) => {
  return (
    <section className='all-news'>
      <div className='news-line all-news__news-line'>
        {allNews.map((currentNews) => {
          return (
            <div key={v4()}>
              <NewsItem currentNews={currentNews} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default AllNews;
