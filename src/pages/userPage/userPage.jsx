import React, { useCallback, useEffect, useState } from 'react';
import './userPage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import AllNews from '@/components/allNews/allNews';
import Loader from '@/UI/loader/loader';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useGetUserById } from '@/hooks/use-getUserById';

const UserPage = () => {
  const [userPageNews, setUserPageNews] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { id = 'currentUser' } = useParams();
  const { userId } = useAuth();
  const user = useGetUserById(id);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setShouldFetch(true);
  }, [id]);

  useEffect(() => {
    if (shouldFetch) {
      const fetchUser = async () => {
        const curentUserResponce = await user;
        setCurrentUser(curentUserResponce);
      };
      fetchUser().then(() => {
        setShouldFetch(false);
      });
    }
  }, [id, user, shouldFetch]);

  useEffect(() => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetUserTweetsAndRetweets${
        id === 'currentUser' ? userId : id
      }?PageNumber=${currentPage}&PageSize=10`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((response) => {
        const paginaton = JSON.parse(response.headers.get('X-Pagination'));
        setHasNextPage(paginaton.HasNext);
        return response.json();
      })
      .then((reversedData) => {
        if (currentPage !== 1) {
          setUserPageNews((prev) => [...prev, ...reversedData.reverse()]);
        } else {
          setUserPageNews(reversedData.reverse());
        }
      });
  }, [id, userId, currentPage]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          300 &&
        hasNextPage
      ) {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, hasNextPage]
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  if (!userPageNews && !currentUser) {
    return <Loader />;
  } else {
    return (
      <section>
        <ProfileHeader currentUser={currentUser} />
        <div className='filtered-news'>
          {!userPageNews.length ? (
            <p className='common-text bookmarks-page-section__common-text'>
              No posts have been written yet
            </p>
          ) : (
            <div className='explore-all-news'>
              <AllNews isUserPage={true} allNews={userPageNews} />
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default UserPage;
