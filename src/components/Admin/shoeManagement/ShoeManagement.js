import ShoeList from './ShoeList';
import React from 'react';
import { Container, Box, Typography, Grid, Button, Alert } from '@mui/material';
import { addShoe } from '../../../api/apiService';
import Input from '../../Auth/Input';
import useStyles from '../styles';

const ShoeManagement = () => {
  const classes = useStyles();
  
  const [formData, setFormData] = React.useState({ name: '', price: '', image: null });
  const [alert, setAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [formError, setFormError] = React.useState('');
  
  const handleAlert = () => {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 6000);
  };
  
  const updatingShoes = () => {
    console.log('Updating Shoes.');
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shoeFormData = new FormData();
    shoeFormData.append('name', formData.name);
    shoeFormData.append('price', formData.price);
    shoeFormData.append('image', formData.image);

    try {
      const response = await addShoe(shoeFormData);
       if (response && response.success) {
         setResponse('Shoe Added successfully.🤗');
         setSeverity('success');
         handleAlert();
         setFormError('');
         updatingShoes();
       }
    } catch (error) {
      setFormError(error.message || 'Something went wrong.');
    }
  };
  
  return (
    <Container>
      <Box className={classes.paper}>
        <Typography variant='h5'>Create Shoe</Typography>
        
        {alert && <Alert sx={{border: 'none', margin: 0,}} variant='outlined' severity={severity} >{response}</Alert>}
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input name='name' label='Shoe Name' handleChange={handleChange} />
            <Input name='price' label='Shoe Price' handleChange={handleChange} />
            <Input name='image' label='Shoe Image' handleFileChange={handleFileChange} />
          </Grid>
          <br />
          {formError && <Typography color="error">{formError}</Typography>}
          <br />
          <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
            Add Shoe
          </Button>
        </form>
      </Box>
      
      <ShoeList shoeUpdate={updatingShoes} />
      
    </Container>
  )
};

export default ShoeManagement;
