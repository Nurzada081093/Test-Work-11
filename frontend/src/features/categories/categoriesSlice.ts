import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import { getCategories } from './categoriesThunk.ts';
import { RootState } from '../../app/store.ts';

interface initialStateCategory {
  categories: ICategory[];
  loading: boolean;
  error: boolean;
}

const initialState: initialStateCategory = {
  categories: [],
  loading: false,
  error: false,
}

export const categoriesFromSlice = (state: RootState) => state.categories.categories;
export const loadingFromSlice = (state: RootState) => state.categories.loading;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCategories.fulfilled, (state, {payload: categories}) => {
        state.categories = categories;
        state.loading = false;
        state.error = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

