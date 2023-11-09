import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
  userEmail: null,
  userPassword: null,
  userName: 'Waqar Bloom',
  profileAvatar: 'waqar.jpg',
  userId: v4(),
  quantityOfFollowers: '254k',
  quantityOfFollowing: '422',
  profileDescription:
    'You can never be overdressed or overeducated.» (Oscar Wilde)',
  profileBackgroundImagePath: 'mountain.jpg',
  userToken: null,
};

export const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userToken = action.payload.userToken;
    },
    deleteCurrentUser: (state) => {
      state.userEmail = null;
      state.userToken = null;
    },
  },
});

export const { setCurrentUser, deleteCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
