import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allUsers: [
    {
      userName: 'Peyton Lyons',
      quantityOfFollowers: '254k',
      quantityOfFollowing: '420',
      profileDescription:
        'The best dreams happen when youre awake.» (Cherie Gilderbloom)',
      profileBackgroundImagePath: 'pens.jpg',
      profileAvatar: 'manface.jpg',
    },
    {
      userName: 'Daniel Jensen',
      quantityOfFollowers: '254k',
      quantityOfFollowing: '421',
      profileDescription:
        'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
      profileBackgroundImagePath: 'mountain.jpg',
      profileAvatar: 'manface.jpg',
    },
    {
      userName: 'Bianca Sosa',
      quantityOfFollowers: '254k',
      quantityOfFollowing: '422',
      profileDescription:
        'You can never be overdressed or overeducated.» (Oscar Wilde)',
      profileBackgroundImagePath: 'mountain.jpg',
      profileAvatar: 'manface.jpg',
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
