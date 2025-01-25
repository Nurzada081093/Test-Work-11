import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, IProduct, IProductMutation } from '../../types';
import { createProduct, deleteProduct, getAllProducts, getOneProduct, getProductsByCategory } from './productsThunk.ts';
import { RootState } from '../../app/store.ts';

interface InitialProductSlice {
  products: IProduct[];
  product: IProductMutation | null;
  loadings: {
    addProductLoading: boolean;
    getProductsLoading: boolean;
    getOneProductLoading: boolean;
    deleteProductLoading: boolean;
  },
  error: boolean;
  deleteError: GlobalError | null,
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
  deleteError: null,
};

export const productsFromSlice = (state: RootState) => state.products.products;
export const productFromSlice = (state: RootState) => state.products.product;
export const getProductsLoadingFromSlice = (state: RootState) => state.products.loadings.getProductsLoading;
export const addProductLoadingFromSlice = (state: RootState) => state.products.loadings.addProductLoading;
export const deleteErrorFromSlice = (state: RootState) => state.products.deleteError;

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
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loadings.deleteProductLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loadings.deleteProductLoading = false;
        state.deleteError = null;
      })
      .addCase(deleteProduct.rejected, (state, {payload: error}) => {
        state.loadings.deleteProductLoading = false;
        state.deleteError = error || null;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loadings.getOneProductLoading = true;
        state.error = false;
      })
      .addCase(getOneProduct.fulfilled, (state, {payload: product}) => {
        state.product = null;
        state.loadings.getOneProductLoading = false;
        state.error = false;
        state.product = product;
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.loadings.getOneProductLoading = false;
        state.error = true;
      })
      .addCase(createProduct.pending, (state) => {
        state.loadings.addProductLoading = true;
        state.error = false;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loadings.addProductLoading = false;
        state.error = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loadings.addProductLoading = false;
        state.error = true;
      });
  }
});

export const productsReducer = productsSlice.reducer;
export const {clearProducts} = productsSlice.actions;