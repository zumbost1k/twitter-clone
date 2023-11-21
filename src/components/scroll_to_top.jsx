import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// import { setCurrentUser } from '@/slices/currentUserSlice';
import { useLocation } from 'react-router-dom';
export default function ScrollToTop() {
  const { pathname } = useLocation();
//   const [userInfo, setUserInfo] = useState(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchData = async () => {
//       fetch(
//         `https://twittercloneapi.azurewebsites.net/UserProfile/GetCurrentUserProfile`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//           setUserInfo({
//             userEmail: data.user.email,
//             userName: !!data.fullName ? data.fullName : data.userName,
//             profileAvatar: !!data.profilePicture
//               ? data.profilePicture
//               : 'emptyAvatar.jpg',
//             userId: data.userId,
//             quantityOfFollowers: data.user.followerFollowerUsers.length,
//             quantityOfFollowing: data.user.followerUsers.length,
//             profileDescription: !!data.bio
//               ? data.bio
//               : 'description hasn`t been written yet.',
//             profileBackgroundImagePath: !!data.backPicture
//               ? data.backPicture
//               : 'mountain.jpg',
//             nickName: data.userName,
//             userToken: data.user.tokenExpires,
//           });
//         });
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     dispatch(setCurrentUser(userInfo));
//   }, [dispatch, userInfo]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
