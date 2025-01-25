import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { UserForm } from '../../../types';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { loginErrorFromSlice, loginLoadingFromSlice } from '../usersSlice.ts';
import { userLogin } from '../usersThunk.ts';
import ButtonSpinner from '../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

const initialState = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState<UserForm>(initialState);
  const loginError = useAppSelector(loginErrorFromSlice);
  const loading = useAppSelector(loginLoadingFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputChangeUser = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUser = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(userLogin({...loginForm})).unwrap();
    navigate('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(245,245,245,0.75)',
          borderRadius: '10px',
          padding: '30px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError && (
          <Alert severity="error" sx={{mt: 3, width: '90%'}}>
            {loginError.error}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={submitUser} sx={{ mt: 3 }}>
          <Grid container direction={'column'} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={inputChangeUser}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={inputChangeUser}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
            {loading ? <ButtonSpinner/> : null}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <Box sx={{textAlign: 'center'}}>
                <NavLink to={'/register'}>
                  No account yet? Sign Up
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;