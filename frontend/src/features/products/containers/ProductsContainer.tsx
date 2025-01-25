import ProductCards from '../components/ProductCards/ProductCards.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { clearProducts, productsFromSlice } from '../productsSlice.ts';
import { useEffect } from 'react';
import { getAllProducts, getProductsByCategory } from '../productsThunk.ts';
import { categoriesFromSlice } from '../../categories/categoriesSlice.ts';
import { getCategories } from '../../categories/categoriesThunk.ts';
import CategoryLists from '../../categories/component/CategoryLists.tsx';
import Box from '@mui/material/Box';

const ProductsContainer = () => {
  const products = useAppSelector(productsFromSlice);
  const categories = useAppSelector(categoriesFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  const getProducts = async () => {
    dispatch(clearProducts());
    await dispatch(getAllProducts());
  };

  const getProductsById = async (id: string) => {
    dispatch(clearProducts());
    await dispatch(getProductsByCategory(id));
  };

  console.log(products);

  return (
    <>
      <Box>
        <CategoryLists categories={categories} getAllProducts={getProducts} getProductsById={getProductsById}/>
        <ProductCards/>
      </Box>

    </>
  );
};

export default ProductsContainer;