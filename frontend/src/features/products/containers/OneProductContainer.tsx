import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { deleteErrorFromSlice, getProductsLoadingFromSlice, productFromSlice } from '../productsSlice.ts';
import { useEffect } from 'react';
import { deleteProduct, getOneProduct } from '../productsThunk.ts';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mainApiUrl } from '../../../globalConstants.ts';
import Box from '@mui/material/Box';
import { userFromSlice } from '../../users/usersSlice.ts';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import Loading from '../../../components/UI/Loading/Loading.tsx';

const OneProductContainer = () => {
  const user = useAppSelector(userFromSlice);
  const product = useAppSelector(productFromSlice);
  const loading = useAppSelector(getProductsLoadingFromSlice);
  const dispatch = useAppDispatch();
  const errorProduct = useAppSelector(deleteErrorFromSlice);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOneProduct(id));
    }
  }, [dispatch]);

  const deleteThisProduct = async (id: string) => {
    if (user) {
      await dispatch(deleteProduct({id, token: user.token}));
      toast.success('This product was successfully deleted!');
    }
  };

  return product && (
    <>
      {loading ? <Loading/> :
        <Card sx={{ maxWidth: "100%", margin: '30px auto' }}>
          {errorProduct &&  <Alert severity="error">{errorProduct.error}</Alert>}
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{margin: '30px auto' }}>
              <CardMedia
                sx={{width: '300px', height: '300px',}}
                component="img"
                alt="green iguana"
                image={mainApiUrl + '/' + product.image}
              />
            </Box>
            <Box sx={{margin: '20px 30px 0 0'}}>
              {user ?
                <Button variant="contained" onClick={() => deleteThisProduct(product._id)}>Продано</Button> : null
              }
            </Box>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: '10px 0', fontSize: '18px' }}>
              <b>Описание:</b> {product.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: '10px 0', fontSize: '18px' }}>
              <b>Цена:</b> {product.price} KGS
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: '10px 0', fontSize: '18px' }}>
              <b>Категория:</b> {product.category.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: '10px 0', fontSize: '18px' }}>
              <b>Данные продовца:</b> {product.user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: '10px 0', fontSize: '18px' }}>
              <b>Номер телефона:</b> {product.user.phoneNumber}
            </Typography>
          </CardContent>
        </Card>
      }
    </>
  );
};

export default OneProductContainer;