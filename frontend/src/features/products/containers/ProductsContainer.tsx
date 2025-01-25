import ProductCards from '../components/ProductCards/ProductCards.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { clearProducts, productsFromSlice } from '../productsSlice.ts';
import { useEffect } from 'react';
import { getAllProducts, getProductsByCategory } from '../productsThunk.ts';
import { categoriesFromSlice } from '../../categories/categoriesSlice.ts';
import { getCategories } from '../../categories/categoriesThunk.ts';
import CategoryLists from '../../categories/component/CategoryLists.tsx';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const ProductsContainer = () => {
  const products = useAppSelector(productsFromSlice);
  const categories = useAppSelector(categoriesFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch]);


  const getProducts = async () => {
    dispatch(clearProducts());
    await dispatch(getAllProducts());
  };

  const getProductsById = async (id: string) => {
    dispatch(clearProducts());
    await dispatch(getProductsByCategory(id));
  };

  return (
    <Container>
      <Box sx={{margin: '30px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <Box sx={{margin: '0 20px 20px 0'}}>
          <CategoryLists categories={categories} getAllProducts={getProducts} getProductsById={getProductsById}/>
        </Box>
        <Box sx={{width: '70%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
          <ProductCards products={products}/>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsContainer;