import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { ICategory } from '../../types';

export const getCategories = createAsyncThunk<ICategory[], void>(
  'categories/getCategoriesThunk',
  async () => {
    const response = await axiosRequest<ICategory[]>('categories');
    return response.data;
  }
);