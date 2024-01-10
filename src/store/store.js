import { configureStore } from '@reduxjs/toolkit';
import { AllPostsSlice } from '@/slices/allPostsSlice';
import { CurrentUserSlice } from '@/slices/currentUserSlice';

export const store = configureStore({
  reducer: {
    allPosts: AllPostsSlice.reducer,
    currentUser: CurrentUserSlice.reducer,
  },
});
