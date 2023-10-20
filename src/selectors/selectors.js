import { createSelector } from 'reselect';

export const selectallUserPage = (state) => state.allUsers.allUsers;
export const selectallNews = (state) => state.allPosts.allPosts;
export const selectCurrentUser = (state) => state.currentUser;
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
