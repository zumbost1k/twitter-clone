import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPosts: [],
};

export const AllPostsSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.allPosts = action.payload;
    },
  },
});
export default AllPostsSlice.reducer;
export const { setTweets } = AllPostsSlice.actions;
