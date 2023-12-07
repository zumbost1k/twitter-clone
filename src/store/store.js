import { configureStore } from '@reduxjs/toolkit';
import { AllPostsSlice } from '@/slices/allPostsSlice';
import { AllUsersSlice } from '@/slices/allUsersSlice';
import { CurrentUserSlice } from '@/slices/currentUserSlice';

export const store = configureStore({
  reducer: {
    allPosts: AllPostsSlice.reducer,
    allUsers: AllUsersSlice.reducer,
    currentUser: CurrentUserSlice.reducer,
  },
});
