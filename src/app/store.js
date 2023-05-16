import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/notes/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer
  },
});
