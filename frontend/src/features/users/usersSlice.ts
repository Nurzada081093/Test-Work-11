import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, IUser, ValidationError } from '../../types';
import { userLogin, userLogout, userRegister } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';

interface initialUserState {
  user: IUser | null;
  loadings: {
    registerLoading: boolean;
    loginLoading: boolean;
    logOutLoading: boolean;
  },
  errors: {
    registerError: ValidationError | null;
    loginError: GlobalError | null;
  },
}

const initialState: initialUserState = {
  user: null,
  loadings: {
    registerLoading: false,
    loginLoading: false,
    logOutLoading: false,
  },
  errors: {
    registerError: null,
    loginError: null,
  },
};

export const userFromSlice = (state: RootState) => state.users.user;
export const registerLoadingFromSlice = (state: RootState) => state.users.loadings.registerLoading;
export const loginLoadingFromSlice = (state: RootState) => state.users.loadings.loginLoading;
export const registerErrorFromSlice = (state: RootState) => state.users.errors.registerError;
export const loginErrorFromSlice = (state: RootState) => state.users.errors.loginError;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loadings.registerLoading = true;
        state.errors.registerError = null;
      })
      .addCase(userRegister.fulfilled, (state, {payload: user}) => {
        state.user = user.user;
        state.loadings.registerLoading = false;
        state.errors.registerError = null;
      })
      .addCase(userRegister.rejected, (state, {payload: error}) => {
        state.loadings.registerLoading = false;
        state.errors.registerError = error || null;
      })
      .addCase(userLogin.pending, (state) => {
        state.loadings.loginLoading = true;
        state.errors.loginError = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload: user}) => {
        state.user = user;
        state.loadings.loginLoading = false;
        state.errors.loginError = null;
      })
      .addCase(userLogin.rejected, (state, {payload: error}) => {
        state.loadings.loginLoading = false;
        state.errors.loginError = error || null;
      })
      .addCase(userLogout.pending, (state) => {
        state.loadings.logOutLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loadings.logOutLoading = false;
      })
      .addCase(userLogout.rejected, (state) => {
        state.loadings.logOutLoading = false;
      });
  }
});

export const usersReducer = usersSlice.reducer;
export const {clearUser} = usersSlice.actions;