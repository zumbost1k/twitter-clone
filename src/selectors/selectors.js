import { createSelector } from 'reselect';

export const selectallUserPage = (state) => state.allUsers.allUsers;
export const selectallNews = (state) => state.allPosts.allPosts;
export const selectCurrentUser = (state) => state.currentUser;
export const selectPostAuthor = (state) => state.postAuthor;
export const selectCurrentUserPage = (state) =>
  state.allUsers.currentUserPageId;

export const selectCurentUSerById = createSelector(
  [selectallUserPage, selectCurrentUserPage],
  (allusers, currentUserId) => {
    return allusers.find((currentUser) => {
      return currentUser.userId === currentUserId;
    });
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
