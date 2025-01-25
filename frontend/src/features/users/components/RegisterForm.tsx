import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { UserForm } from '../../../types';
import { registerErrorFromSlice, registerLoadingFromSlice } from '../usersSlice.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import ButtonSpinner from '../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  register: (user: UserForm) => void;
}

const initialUserState = {
  username: '',
  password: '',
  displayName: '',
  phoneNumber: '',
};

const RegisterForm: React.FC<Props> = ({register}) => {
  const [registerForm, setRegisterForm] = useState<UserForm>(initialUserState);
  const registerError = useAppSelector(registerErrorFromSlice);
  const loading = useAppSelector(registerLoadingFromSlice);

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({...registerForm});
  };

  const getError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          width: '500px',
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(245,245,245,0.75)',
          borderRadius: '10px',
          padding: '15px 0',
        }}
      >
        <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitUser} sx={{ margin: '10px 30px'}}>
          <Grid container direction={'column'} spacing={2}>
            <Grid size={12}>
              <TextField
                sx={{width: '400px'}}
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={onChangeUser}
                error={Boolean(getError('username'))}
                helperText={getError('username')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="username"
                label="Display name"
                name="displayName"
                onChange={onChangeUser}
                error={Boolean(getError('displayName'))}
                helperText={getError('displayName')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="Phone number"
                name="phoneNumber"
                onChange={onChangeUser}
                error={Boolean(getError('phoneNumber'))}
                helperText={getError('phoneNumber')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChangeUser}
                error={Boolean(getError('password'))}
                helperText={getError('password')}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
            {loading ? <ButtonSpinner/> : null}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <Box sx={{textAlign: 'center'}}>
                <NavLink to={'/login'}>
                  Already have an account? Sign in
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
