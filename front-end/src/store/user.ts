import { combineReducers, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import {createSlice } from '@reduxjs/toolkit';


export interface ILogin {
  login: boolean
}


const userLogin = createSlice({
  name: 'user',
  initialState: {
    login: false
  },
  reducers: {
    loginUser(state, {payload}: PayloadAction<ILogin>) {
      state.login = payload.login;
    }
  },

});

export const { loginUser } = userLogin.actions;

export default userLogin.reducer;