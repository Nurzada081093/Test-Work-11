import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, IUser, UserForm, UserRegister, ValidationError } from '../../types';
import axiosRequest from '../../axiosRequest.ts';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';

export const userRegister = createAsyncThunk<
  UserRegister,
  UserForm,
  {rejectValue: ValidationError}
>(
  'users/userRegister',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post<UserRegister>('/users/register', {...user});
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const userLogin = createAsyncThunk<IUser, UserForm, {rejectValue: GlobalError}>(
  "users/userLogin",
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post<UserRegister>('users/sessions', {...user});
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);

export const userLogout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logoutUser',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    await axiosRequest.delete(`users/sessions/`, {headers: {'Authorization': token}});
  }
);