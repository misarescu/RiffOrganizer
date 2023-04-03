import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user-slice';

const store = configureStore({
  reducer: { user: userReducer },
});

export default store;
export type StoreStateType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;
