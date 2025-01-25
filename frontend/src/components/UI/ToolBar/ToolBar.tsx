import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { userFromSlice } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousUserMenu from './AnonymousUserMenu.tsx';

const ToolBar = () => {
  const user = useAppSelector(userFromSlice);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'rgba(71,70,70,0.25)'}}>
        <Container>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '20px 0'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" component={NavLink} sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }} to={'/'}>
                Candy Shop
              </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
              <Box>
                {user && <Typography sx={{fontSize: '20px', textTransform: 'uppercase', marginTop: '18px', marginRight: '10px'}}>Hello, <b>{user?.username}!</b></Typography>}
              </Box>
              <Box>
                {user ? <UserMenu/> : <AnonymousUserMenu/>}
              </Box>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;