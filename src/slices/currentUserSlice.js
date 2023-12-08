import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEmail: null,
  userName: null,
  profileAvatar: null,
  userId: null,
  quantityOfFollowers: null,
  quantityOfFollowing: null,
  profileDescription: null,
  profileBackgroundImagePath: null,
  nickName: null,
};

export const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
      state.profileAvatar = action.payload.profilePicture;
      state.userId = action.payload.userId;
      state.quantityOfFollowers = action.payload.quantityOfFollowers;
      state.quantityOfFollowing = action.payload.quantityOfFollowing;
      state.profileDescription = action.payload.profileDescription;
      state.profileBackgroundImagePath =
        action.payload.profileBackgroundImagePath;
      state.nickName = action.payload.nickName;
    },
    deleteCurrentUser: (state, action) => {
      state.userEmail = null;
      state.userName = null;
      state.profileAvatar = null;
      state.userId = null;
      state.quantityOfFollowers = null;
      state.quantityOfFollowing = null;
      state.profileDescription = null;
      state.profileBackgroundImagePath = null;
      state.nickName = null;
    },
  },
});

export const { setCurrentUser, deleteCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
