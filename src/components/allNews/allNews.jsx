import React, { useEffect, useState } from 'react';
import './allNews.css';
import NewsItem from '@/components/newsItem/newsItem.jsx';
import { v4 } from 'uuid';
const AllNews = ({ allNews }) => {
  const [currentAllNews, setCurrentAllNews] = useState(allNews);
  const deleteMessageHandler = (id) => {
    const filteredAllNews = currentAllNews.filter(
      (currentNews) => currentNews.tweetId !== id
    );
    setCurrentAllNews(filteredAllNews);
  };

  useEffect(() => {
    setCurrentAllNews(allNews);
  }, [allNews]);

  return (
    <section className='all-news'>
      <div className='news-line all-news__news-line'>
        {currentAllNews.map((currentNews) => {
          return (
            <div key={v4()}>
              <NewsItem
                currentNews={currentNews}
                onDeleteFunction={deleteMessageHandler}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default AllNews;
