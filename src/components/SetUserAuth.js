import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/slices/currentUserSlice';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

export default function SetUserAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(
      setCurrentUser(responseData.data)
    );
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
      navigate('/registration');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData().catch((error) => {
      fetchRefreshToken().catch(() => {});
    });
  }, [fetchData, fetchRefreshToken, navigate]);
}
