import { configureStore } from '@reduxjs/toolkit';
import { CurrentUserSlice } from '@/slices/currentUserSlice';
import { ExplorePageNewsSlice } from '@/slices/explorePageNewsSlice';

export const store = configureStore({
  reducer: {
    currentUser: CurrentUserSlice.reducer,
    explorePageNews: ExplorePageNewsSlice.reducer,
  },
});
