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
      Object.assign(state, action.payload)
    },
  },
});

export const { setCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
