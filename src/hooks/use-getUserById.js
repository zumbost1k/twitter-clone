import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { useEffect } from 'react';

export const useGetUserById = async (userId) => {
  const { id } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate('/authorization');
    }
  }, [id, navigate]);

  const getUserById = async () => {
    return fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetUserProfileById${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    ).then((response) => response.json());
  };

  const getCurrentUserById = async () => {
    return fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetCurrentUserProfile`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    ).then((response) => response.json());
  };

  const responseData =
    userId === 'currentUser' ? await getCurrentUserById() : await getUserById();
  responseData.data.profileAvatar = !!responseData.data.profilePicture
    ? responseData.data.profilePicture
    : './photos/usersAvatar/emptyAvatar.jpg';

  responseData.data.nickName = responseData.data.userName;
  responseData.data.userName = responseData.data.fullName;
  responseData.data.profileBackgroundImagePath = !!responseData.data.backPicture
    ? responseData.data.backPicture
    : './photos/profileBackgrounds/mountain.jpg';
  return responseData.data;
};
