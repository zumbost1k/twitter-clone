import React from 'react';
import './allNews.css';
import { useSelector } from 'react-redux';
import NewsItem from '@/components/newsItem/newsItem.jsx';
import { selectallNews, selectCurentUSer } from '@/selectors/selectors';
import Reboot from '@/icons/reboot';
const AllNews = () => {
  const allNews = useSelector(selectallNews);
  const currentUSer = useSelector(selectCurentUSer);
  return (
    <section className='all-news'>
      <p className='common-text all-news__common-text'>
        <Reboot />
        {currentUSer.userName} Retweeted
      </p>
      <div className='news-line all-news__news-line'>
        {allNews.map((currentNews) => {
          return (
            <NewsItem key={currentNews.postId} currentNews={currentNews} />
          );
        })}
      </div>
    </section>
  );
};
export default AllNews;
