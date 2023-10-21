import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: 'Waqar Bloom',
  userAvatar: 'waqar.jpg',
};

export const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
});

export default CurrentUserSlice.reducer;
