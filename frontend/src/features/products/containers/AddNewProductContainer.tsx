import AddNewProduct from '../components/AddNewProduct/AddNewProduct.tsx';
import { IProduct } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import { createProduct } from '../productsThunk.ts';


const AddNewProductContainer = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userFromSlice);

  const onSubmitProduct = (product: IProduct) => {
    if (user) {
      product.user = user._id;
      dispatch(createProduct({product, token: user.token}));
    }
    console.log(product);
  }

  return (
    <>
     <AddNewProduct onSubmitProduct={onSubmitProduct} />
    </>
  );
};

export default AddNewProductContainer;