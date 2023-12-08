import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  allUsers: [
    {
      userId: 1,
      userName: 'Peyton Lyons',
      quantityOfFollowers: 254000,
      quantityOfFollowing: 420,
      profileDescription:
        'The best dreams happen when youre awake.» (Cherie Gilderbloom)',
      profileBackgroundImagePath: 'pens.jpg',
      nickName: 'Peyloy',
      profileAvatar: '/photos/usersAvatar/manface.jpg',
    },
    {
      userId: 2,
      userName: 'Daniel Jensen',
      quantityOfFollowers: 254500,
      quantityOfFollowing: '421',
      profileDescription:
        'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
      profileBackgroundImagePath: 'mountain.jpg',
      nickName: 'Peyloy',
      profileAvatar: '/photos/usersAvatar/alice.jpeg',
    },
    {
      userId: 3,
      userName: 'Bianca Sosa',
      quantityOfFollowers: 355200,
      quantityOfFollowing: 422,
      profileDescription:
        'You can never be overdressed or overeducated.» (Oscar Wilde)',
      profileBackgroundImagePath: 'mountain.jpg',
      nickName: 'Peyloy',
      profileAvatar: '/photos/usersAvatar/skyler.jpeg',
    },
  ],
  currentUserPageId: '',
};

export const AllUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    changeCurrentUserPage: (state, action) => {
      state.currentUserPageId = action.payload;
    },
  },
});
export const { changeCurrentUserPage } = AllUsersSlice.actions;
export default AllUsersSlice.reducer;
