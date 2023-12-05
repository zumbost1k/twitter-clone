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

export const PostAuthorSlice = createSlice({
  name: 'postAuthor',
  initialState,
  reducers: {
    setPostAuthor: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.fullName;
      state.profileAvatar = action.payload.profilePicture;
      state.userId = action.payload.userId;
      state.quantityOfFollowers = action.payload.quantityOfFollowers;
      state.quantityOfFollowing = action.payload.quantityOfFollowing;
      state.profileDescription = action.payload.profileDescription;
      state.profileBackgroundImagePath =
          action.payload.backPicture;
      state.nickName = action.payload.nickName;
    },
  },
});

export const { setPostAuthor } = PostAuthorSlice.actions;
export default PostAuthorSlice.reducer;
