import { Button, OutlinedInput, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Textarea from '@mui/joy/Textarea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../categories/categoriesThunk.ts';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { categoriesFromSlice } from '../../../categories/categoriesSlice.ts';
import { ICategory, IProduct } from '../../../../types';
import FileInput from '../../../../components/FileInput/FileInput.tsx';

export interface Props {
  onSubmitProduct: (product: IProduct) => void;
}

const AddNewProduct:React.FC<Props> = ({onSubmitProduct}) => {
  const [newProduct, setNewProduct] = useState<IProduct>({
    category: '',
    title: '',
    description: '',
    price: 0,
    image: '',
  });
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesFromSlice);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onChangeField = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitProduct({...newProduct});
  }

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setNewProduct((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <form onSubmit={onSubmit} style={{
      border: '1px solid lightgrey',
      width: '70%',
      margin: '20px auto 70px',
      padding: '50px 0',
      borderRadius: '20px',
      backgroundColor: 'white',
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        Add new product
      </Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              variant="outlined"
              name="category"
              value={newProduct.category}
              onChange={onChangeField}
              input={<OutlinedInput label="Category"/>}
            >
              {categories.map((category: ICategory) => (
                <MenuItem
                  key={category._id}
                  value={category.title}
                >
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            value={newProduct.title}
            onChange={onChangeField}
          />
        </Grid>
        <Grid size={12}>
          <Textarea
            id="outlined-basic"
            variant="outlined"
            placeholder="Description..."
            minRows={5}
            value={newProduct.description}
            name="description"
            onChange={onChangeField}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%', marginBottom: '10px'}}
            id="outlined-basic"
            label="Prise"
            name="price"
            variant="outlined"
            value={newProduct.price}
            type="number"
            onChange={onChangeField}
          />
          <Grid size={{ xs: 12 }}>
            <FileInput
              name="image"
              label="Image"
              onGetFile={fileEventChangeHandler}
            />
          </Grid>
          <Grid size={12}>
            <Button sx={{width: '100%', mt: 1}} variant="contained" type="submit">
              create
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewProduct;