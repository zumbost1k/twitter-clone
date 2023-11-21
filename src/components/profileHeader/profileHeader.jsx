import React from 'react';
import './profileHeader.css';
import Subscribe from '@/icons/subscribe';
import CustomButton from '@/UI/customButton/cistomButton';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurentUSerById, selectCurrentUser } from '@/selectors/selectors';
import { format } from 'numerable';
// import { setCurrentUser } from '@/slices/currentUserSlice';
const ProfileHeader = () => {
  // const [userInfo, setUserInfo] = useState(null);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log('hi there');
  //   const fetchData = async () => {
  //     fetch(
  //       `https://twittercloneapi.azurewebsites.net/UserProfile/GetCurrentUserProfile`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUserInfo({
  //           userEmail: data.user.email,
  //           userName: !!data.fullName ? data.fullName : data.userName,
  //           profileAvatar: !!data.profilePicture
  //             ? data.profilePicture
  //             : 'emptyAvatar.jpg',
  //           userId: data.userId,
  //           quantityOfFollowers: data.user.followerFollowerUsers.length,
  //           quantityOfFollowing: data.user.followerUsers.length,
  //           profileDescription: !!data.bio
  //             ? data.bio
  //             : 'description hasn`t been written yet.',
  //           profileBackgroundImagePath: !!data.backPicture
  //             ? data.backPicture
  //             : 'mountain.jpg',
  //           nickName: data.userName,
  //           userToken: data.user.tokenExpires,
  //         });
  //       });
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   dispatch(setCurrentUser(userInfo));
  // }, [dispatch, userInfo]);

  const { id = 'currentUser' } = useParams();
  const currentUsersProfile = useSelector(selectCurentUSerById);
  const userPage = useSelector(selectCurrentUser);
  const isCurrentUserPage = id === 'currentUser';
  const currentUser = isCurrentUserPage ? userPage : currentUsersProfile;

  return (
    <section
      className='profile-header-container'
      style={{
        backgroundImage: `url('./photos/profileBackgrounds/${currentUser.profileBackgroundImagePath}')`,
      }}
    >
      <div className='profile-header'>
        <img
          className='avatar profile-header__avatar'
          src={`./photos/usersAvatar/${currentUser.profileAvatar}`}
          alt='avatar'
          width='116'
          height='116'
        />
        <div className='container profile-header__container'>
          <h2 className='name profile-header__name'>{currentUser.userName}</h2>
          <div className='followers container__followers'>
            <p className='common-text followers__common-text'>
              <span className='followers__common-text_bold'>
                {format(currentUser.quantityOfFollowing, '0a')}
              </span>{' '}
              Following
            </p>
            <p className='common-text followers__common-text'>
              <span className='followers__common-text_bold'>
                {format(currentUser.quantityOfFollowers, '0a')}
              </span>{' '}
              Followers
            </p>
          </div>
          <p className='common-text container__common-text'>
            {currentUser.profileDescription}
          </p>
          {!isCurrentUserPage ? (
            <div className='custom-button container__custom-button'>
              <CustomButton
                type={'button'}
                size={'standard'}
                content={
                  <span className='content container__content'>
                    <Subscribe width={'14'} height={'14'} />
                    Follow
                  </span>
                }
              />
            </div>
          ) : (
            <div className='custom-button container__custom-button' />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
