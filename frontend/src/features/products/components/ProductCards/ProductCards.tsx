import ProductCard from './ProductCard/ProductCard.tsx';
import { IProduct } from '../../../../types';
import React from 'react';

interface Props {
  products: IProduct[];
}

const ProductCards:React.FC<Props> = ({products}) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
};

export default ProductCards;