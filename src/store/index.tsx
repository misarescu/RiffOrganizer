import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user-slice';
import { uiReducer } from './ui-slice';

const store = configureStore({
  reducer: { user: userReducer, ui: uiReducer },
});

export default store;
export type StoreStateType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;
