import React from 'react';
import './allNews.css';
import { useSelector } from 'react-redux';
import NewsItem from '@/components/newsItem/newsItem.jsx';
import { useParams } from 'react-router-dom';
import { selectCurentUSerById, selectCurrentUser } from '@/selectors/selectors';
import Reboot from '@/icons/reboot';
const AllNews = ({ isUserPage, allNews }) => {
  const { id = 'currentUser' } = useParams();
  const currentUsersProfile = useSelector(selectCurentUSerById);
  const userPage = useSelector(selectCurrentUser);
  const isCurrentUserPage = id === 'currentUser';
  const currentUser = isCurrentUserPage ? userPage : currentUsersProfile;
  return (
    <section className='all-news'>
      {isUserPage && (
        <p className='common-text all-news__common-text'>
          <Reboot width={'14'} height={'16'} />
          {isCurrentUserPage ? 'You' : currentUser.userName} Retweeted
        </p>
      )}

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
