import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { IProduct } from '../../../../../types';
import React from 'react';
import { mainApiUrl } from '../../../../../globalConstants.ts';
import { useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';

interface Props {
  product: IProduct;
}

const ProductCard:React.FC<Props> = ({product}) => {
  const user = useAppSelector(userFromSlice);

  const deleteThisProduct = (id: string) => {
    console.log(id);
  };

  return (
    <Card sx={{ width: 230, height: 320, margin: '0 10px 20px 10px' }}>
      <div>
        <Typography level="title-lg">{product.title}</Typography>
      </div>
      <AspectRatio minHeight="130px" maxHeight="220px">
        <img
          src={mainApiUrl + '/' + product.image}
          srcSet={mainApiUrl + '/' + product.image}
          loading="lazy"
          alt={product.title}
        />
      </AspectRatio>
      <CardContent orientation="horizontal" sx={{marginTop: '20px'}}>
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{product.price} KGZ</Typography>
        </div>
        {user ?
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            onClick={() => deleteThisProduct(product._id)}
          >
            Sold
          </Button> : null
        }
      </CardContent>
    </Card>
  );
};

export default ProductCard;