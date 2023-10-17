import { configureStore } from '@reduxjs/toolkit';
import { AllPostsSlice } from '@/slices/allPostsSlice';
import { AllUsersSlice } from '@/slices/allUsersSlice';

export const store = configureStore({
  reducer: {
    allPosts: AllPostsSlice.reducer,
    allUsers: AllUsersSlice.reducer,
  },
});
