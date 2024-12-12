import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { signUp, signIn } from '../../api/apiService';
import getRoleFromToken from '../../utils/getRoleFromToken';
import useStyles from './styles';
import Input from './Input';


const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', phoneNumber: '', email: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const [formError, setFormError] = useState('');

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError('');

  try {
    let response;

    if (isSignup) {
      response = await signUp(formData);
      if (response && response.success) {
        navigate('/');
      }
    } else {
      response = await signIn(formData);
      if (response && response.success) {
        const role = getRoleFromToken();
        role === 'admin' ? navigate('/admin/dashboard') : navigate('/');
      }
    }
  } catch (error) {
    setFormError(error.message || 'Something went wrong.');
  }
};



  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper} elevation={6}  >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="username" label="User Name" handleChange={handleChange} autoFocus />
              <Input name="phoneNumber" label="Phone Number" handleChange={handleChange}/>
            </>
            )}
            
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          </Grid>
          <br />
          {formError && <Typography color="error">{formError}</Typography>}
          <br/>
          <Button type="submit"  fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          
          <Grid container justify="flex-end">
            <Grid item><br/>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
