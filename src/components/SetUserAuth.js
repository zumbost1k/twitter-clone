// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from '@/slices/currentUserSlice';
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';

export default function SetUserAuth() {
  // const [userInfo, setUserInfo] = useState(null);
  // const dispatch = useDispatch();
  // const apiUrl = process.env.REACT_APP_API_URL;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${apiUrl}/UserProfile/GetCurrentUserProfile`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setUserInfo({
  //       userEmail: data.user.email,
  //       userName: !!data.fullName ? data.fullName : data.userName,
  //       profileAvatar: !!data.profilePicture
  //         ? data.profilePicture
  //         : 'emptyAvatar.jpg',
  //       userId: data.userId,
  //       quantityOfFollowers: data.user.followerFollowerUsers.length,
  //       quantityOfFollowing: data.user.followerUsers.length,
  //       profileDescription: !!data.bio
  //         ? data.bio
  //         : 'description hasn`t been written yet.',
  //       profileBackgroundImagePath: !!data.backPicture
  //         ? data.backPicture
  //         : 'mountain.jpg',
  //       nickName: data.userName,
  //       userToken: data.user.tokenExpires,
  //     });
  //   };
  //   fetchData().catch((error) => <Navigate to='/registration' />);
  // }, [apiUrl]);

  // useEffect(() => {
  //   if (userInfo) {
  //     dispatch(setCurrentUser(userInfo));
  //   }
  // }, [dispatch, userInfo]);
}
