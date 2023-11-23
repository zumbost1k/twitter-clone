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
      state.profileAvatar = action.payload.profileAvatar;
      state.userId = action.payload.userId;
      state.quantityOfFollowers = action.payload.quantityOfFollowers;
      state.quantityOfFollowing = action.payload.quantityOfFollowing;
      state.profileDescription = action.payload.profileDescription;
      state.profileBackgroundImagePath =
        action.payload.profileBackgroundImagePath;
      state.nickName = action.payload.nickName;
    },
  },
});

export const { setCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
