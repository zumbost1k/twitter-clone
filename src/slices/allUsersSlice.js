import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
  allUsers: [
    {
      userId: v4(),
      userName: 'Peyton Lyons',
      quantityOfFollowers: '254k',
      quantityOfFollowing: '420',
      profileDescription:
        'The best dreams happen when youre awake.» (Cherie Gilderbloom)',
      profileBackgroundImagePath: 'pens.jpg',
      profileAvatar: 'manface.jpg',
    },
    {
      userId: v4(),
      userName: 'Daniel Jensen',
      quantityOfFollowers: '254k',
      quantityOfFollowing: '421',
      profileDescription:
        'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
      profileBackgroundImagePath: 'mountain.jpg',
      profileAvatar: 'alice.jpeg',
    },
    {
      userId: v4(),
      userName: 'Bianca Sosa',
      quantityOfFollowers: '254k',
      quantityOfFollowing: '422',
      profileDescription:
        'You can never be overdressed or overeducated.» (Oscar Wilde)',
      profileBackgroundImagePath: 'mountain.jpg',
      profileAvatar: 'skyler.jpeg',
    },
  ],
  currentUserPageName: 'Daniel Jensen',
};

export const AllUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    changeCurrentUserPage: (state, action) => {
      state.currentUserPageName = action.payload;
    },
  },
});
export const { changeCurrentUserPage } = AllUsersSlice.actions;
export default AllUsersSlice.reducer;
