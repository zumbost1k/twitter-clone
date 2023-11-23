import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/slices/currentUserSlice';
import { useEffect, useState } from 'react';

export default function SetUserAuth() {
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  // const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetCurrentUserProfile`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserInfo({
        userEmail: data.userEmail,
        userName: !!data.fullName ? data.fullName : data.userName,
        profileAvatar: !!data.profilePicture
          ? data.profilePicture
          : 'emptyAvatar.jpg',
        userId: data.userID,
        quantityOfFollowers: data.quantityOfFollowers,
        quantityOfFollowing: data.quantityOfFollowing,
        profileDescription: !!data.profileDescription
          ? data.profileDescription
          : 'description hasn`t been written yet.',
        profileBackgroundImagePath: !!data.backPicture
          ? data.backPicture
          : 'mountain.jpg',
        nickName: data.userName,
      });
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(setCurrentUser(userInfo));
    }
  }, [dispatch, userInfo]);
}
