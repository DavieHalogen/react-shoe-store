import React from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { addShoe } from '../../api/apiService';
import Input from '../Auth/Input';
import useStyles from './styles';

const ShoeManagement = () => {
  const classes = useStyles();
  
  const [formData, setFormData] = React.useState({ name: '', price: '', image: null });
  
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
      const response = await addShoe(formData);
    } catch (error) {
      console.error('Error while adding shoe:', error);
    }
  };
  
  return (
    <Container>
      <Box className={classes.paper}>
        <Typography variant='h5'>Create Shoe</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input name='name' label='Shoe Name' handleChange={handleChange} />
            <Input name='price' label='Shoe Price' handleChange={handleChange} />
            <Input name='image' label='Shoe Image' handleFileChange={handleFileChange} />
          </Grid>
          <br />
          <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
            Add Shoe
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ShoeManagement;
