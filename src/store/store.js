import { configureStore } from '@reduxjs/toolkit';
import { CurrentUserSlice } from '@/slices/currentUserSlice';

export const store = configureStore({
  reducer: {
    currentUser: CurrentUserSlice.reducer,
  },
});
