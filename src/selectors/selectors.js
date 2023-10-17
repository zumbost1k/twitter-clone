import { createSelector } from 'reselect';

export const selectallUserPage = (state) => state.allUsers.allUsers;
export const selectallNews = (state) => state.allPosts.allPosts;
export const selectCurrentUserPage = (state) =>
  state.allUsers.currentUserPageName;

export const selectCurentUSer = createSelector(
  [selectallUserPage, selectCurrentUserPage],
  (allusers, currentUserName) => {
    return allusers.find((currentUser) => {
      return currentUser.userName === currentUserName;
    });
  }
);
