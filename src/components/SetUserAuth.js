import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/slices/currentUserSlice';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function SetUserAuth() {
  const [shouldFetch, setShouldFetch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetCurrentUserProfile`,
      {
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    const responseData = await response.json();
    responseData.data.profileAvatar = responseData.data.profilePicture
      ? responseData.data.profilePicture
      : './photos/usersAvatar/emptyAvatar.jpg';

    responseData.data.nickName = responseData.data.userName;
    responseData.data.userName = responseData.data.fullName;
    responseData.data.profileBackgroundImagePath = responseData.data.backPicture
      ? responseData.data.backPicture
      : './photos/profileBackgrounds/mountain.jpg';
    dispatch(setCurrentUser(responseData.data));
    navigate('/home');
  }, [dispatch, navigate]);

  const fetchRefreshToken = useCallback(async () => {
    const response = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Authentication/RefreshToken`,
      {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
    if (!response.ok) {
      setShouldFetch(false);
      navigate('/registration');
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAuth && shouldFetch) {
      fetchData();
    }
  }, [fetchData, fetchRefreshToken, navigate, isAuth, shouldFetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRefreshToken();
    }, 600000);
    return () => clearInterval(interval);
  }, [fetchRefreshToken]);
}
