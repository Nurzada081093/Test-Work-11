import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { userLogout } from '../../../features/users/usersThunk.ts';
import { clearUser } from '../../../features/users/usersSlice.ts';
import { AccountCircle } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(clearUser());
  };

  return (
    <Box sx={{display: 'flex', width: '250px', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
      <Button color='inherit' variant="text" to={'/products/addNewProduct'} component={NavLink} sx={{fontSize: '16px'}}>Add new product</Button>
      <Button color='inherit' onClick={handleClick}>
        <AccountCircle fontSize="large"/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;