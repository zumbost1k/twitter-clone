import React, { useEffect, useState } from 'react';
import './allNews.css';
import NewsItem from '@/components/newsItem/newsItem.jsx';
import { useParams } from 'react-router-dom';
import Reboot from '@/icons/reboot';
import { v4 } from 'uuid';
import { useGetUserById } from '@/hooks/use-getUserById';
import Loader from '@/UI/loader/loader';
const AllNews = ({ isUserPage, allNews }) => {
  const { id = 'currentUser' } = useParams();
  const isCurrentUserPage = id === 'currentUser';
  const [shouldFetch, setShouldFetch] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const user = useGetUserById(id);

  useEffect(() => {
    if (shouldFetch) {
      const fetchUser = async () => {
        setCurrentUser(await user);
      };
      fetchUser().then(() => {
        setShouldFetch(false);
      });
    }
  }, [id, user, shouldFetch]);
  if (!currentUser) {
    return <Loader />;
  }
  return (
    <section className='all-news'>
      {isUserPage && (
        <p className='common-text all-news__common-text'>
          <Reboot width={'14'} height={'16'} />
          {isCurrentUserPage
            ? 'You'
            : currentUser.fullName
            ? currentUser.fullName
            : currentUser.userName}{' '}
          Retweeted
        </p>
      )}

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
