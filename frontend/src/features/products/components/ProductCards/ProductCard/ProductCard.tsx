import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { IProduct } from '../../../../../types';
import React from 'react';
import { mainApiUrl } from '../../../../../globalConstants.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: IProduct;
}

const ProductCard:React.FC<Props> = ({product}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 230, height: 320, margin: '0 10px 20px 10px' }} onClick={() => navigate(`/products/${product._id}`)}>
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;