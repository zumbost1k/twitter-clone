import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
  userName: 'Waqar Bloom',
  profileAvatar: 'waqar.jpg',
  userId: v4(),
  quantityOfFollowers: '254k',
  quantityOfFollowing: '422',
  profileDescription:
    'You can never be overdressed or overeducated.» (Oscar Wilde)',
  profileBackgroundImagePath: 'mountain.jpg',
};

export const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
});

export default CurrentUserSlice.reducer;
