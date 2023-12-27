import { createSelector } from 'reselect';

export const selectallUserPage = (state) => state.allUsers.allUsers;
export const selectallNews = (state) => state.allPosts.allPosts;
export const selectCurrentUser = (state) => state.currentUser;
export const selectCurrentUserPage = (state) =>
  state.allUsers.currentUserPageId;

export const selectCurentUSerById = createSelector(
  [selectCurrentUser, selectCurrentUserPage],
  async (currentUser, currentUserPageId) => {
    if (currentUserPageId === 'currentUser') {
      return currentUser;
    }
    const getUserById = await fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetUserProfileById${currentUserPageId}`
    );
    const responseData = await getUserById.json();
    responseData.data.profileAvatar = !!responseData.data.profilePicture
      ? responseData.data.profilePicture
      : './photos/usersAvatar/emptyAvatar.jpg';

    responseData.data.nickName = responseData.data.userName;
    responseData.data.userName = responseData.data.fullName;
    responseData.data.profileBackgroundImagePath = !!responseData.data
      .backPicture
      ? responseData.data.backPicture
      : './photos/profileBackgrounds/mountain.jpg';
    return responseData.data;
  }
);

export const selectTopTwoUsersByFollowers = createSelector(
  [selectallUserPage],
  (allusers) => {
    let firstUser = {};
    let secondUser = {};
    allusers.forEach((currentUser) => {
      if (
        currentUser.quantityOfFollowers > firstUser.quantityOfFollowers ||
        !firstUser.quantityOfFollowers
      ) {
        secondUser = Object.assign({}, firstUser);
        firstUser = Object.assign({}, currentUser);
      }
    });
    return [firstUser, secondUser];
  }
);
