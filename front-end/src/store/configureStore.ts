import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './user';

// const middleware = [...getDefaultMiddleware()];

const reducer = combineReducers({ user });
const store = configureStore({ reducer });

export default store;