import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  explorePageNews: [],
};

export const ExplorePageNewsSlice = createSlice({
  name: 'ExplorePage',
  initialState,
  reducers: {
    setExplorePageNews: (state, action) => {
      state.explorePageNews = state.explorePageNews.concat(action.payload);
    },
  },
});

export const { setExplorePageNews } = ExplorePageNewsSlice.actions;
export default ExplorePageNewsSlice.reducer;
