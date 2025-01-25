import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { ICategory } from '../../../types';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Props {
  categories: ICategory[];
  getAllProducts: () => void;
  getProductsById: (id: string) => void;
}

const CategoryLists:React.FC<Props> = ({categories, getAllProducts, getProductsById}) => {
  return (
    <Box sx={{backgroundColor: 'rgba(245,245,245,0.84)', width: '300px', borderRadius: '10px'}}>
      <List aria-labelledby="decorated-list-demo" sx={{fontSize: '18px'}}>
        <ListItem>
          <Button sx={{color: 'black'}} onClick={getAllProducts}>All categories</Button>
        </ListItem>
        {categories.map(category => (
          <ListItem key={category._id}>
            <Button sx={{color: 'black'}} onClick={() => getProductsById(category._id)}>{category.title}</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoryLists;