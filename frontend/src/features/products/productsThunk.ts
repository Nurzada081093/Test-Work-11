import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { GlobalError, IProduct, IProductForm, IProductMutation } from '../../types';
import { isAxiosError } from 'axios';

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

export const getOneProduct= createAsyncThunk<IProductMutation, string>(
  'products/getOneProduct',
  async (id) => {
    const response = await axiosRequest<IProductMutation>(`/products/${id}`);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<void, {id: string, token: string }, {rejectValue: GlobalError}>(
  'products/deleteProduct',
  async ({id, token}, {rejectWithValue}) => {
    try {
      await axiosRequest.delete(`/products/${id}`, {headers: {'Authorization': token}});
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        return rejectWithValue(error.response.data as GlobalError);
      }

      throw error;
    }
  }
);

export const createProduct = createAsyncThunk<void, { product: IProductForm, token: string }>(
  'products/createProduct',
  async ({product, token}) => {
    const formData = new FormData();
    const keys = Object.keys(product) as (keyof IProductForm)[];

    keys.forEach((key) => {
      const value = product[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosRequest.post('/products', formData, {headers: {'Authorization': token}});
  }
);