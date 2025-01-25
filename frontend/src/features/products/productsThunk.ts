import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IProduct } from '../../types';

export const getAllProducts= createAsyncThunk<IProduct[], void>(
  'products/getAllProducts',
  async () => {
    const response = await axiosRequest<IProduct[]>('/products');
    return response.data;
  }
);

export const getProductsByCategory= createAsyncThunk<IProduct[], string>(
  'products/getProductsByCategory',
  async (id) => {
    const response = await axiosRequest<IProduct[]>(`/products?category=${id}`);
    return response.data;
  }
);