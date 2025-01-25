import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types';
import { getAllProducts, getProductsByCategory } from './productsThunk.ts';
import { RootState } from '../../app/store.ts';

interface InitialProductSlice {
  products: IProduct[];
  product: IProduct | null;
  loadings: {
    addProductLoading: boolean;
    getProductsLoading: boolean;
    getOneProductLoading: boolean;
    deleteProductLoading: boolean;
  },
  error: boolean;
}

const initialState: InitialProductSlice = {
  products: [],
  product: null,
  loadings: {
    addProductLoading: false,
    getProductsLoading: false,
    getOneProductLoading: false,
    deleteProductLoading: false,
  },
  error: false,
};

export const productsFromSlice = (state: RootState) => state.products.products;
export const getProductsLoadingFromSlice = (state: RootState) => state.products.loadings.getProductsLoading;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loadings.getProductsLoading = true;
        state.error = false;
      })
      .addCase(getAllProducts.fulfilled, (state, {payload: products}) => {
        state.products = products;
        state.loadings.getProductsLoading = false;
        state.error = false;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.loadings.getProductsLoading = false;
        state.error = true;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.loadings.getProductsLoading = true;
        state.error = false;
      })
      .addCase(getProductsByCategory.fulfilled, (state, {payload: products}) => {
        state.products = products;
        state.loadings.getProductsLoading = false;
        state.error = false;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loadings.getProductsLoading = false;
        state.error = true;
      });
  }

});

export const productsReducer = productsSlice.reducer;
export const {clearProducts} = productsSlice.actions;