import React from "react";
import { Modal, Typography, ButtonGroup, Button, Box, Fade, Alert } from '@mui/material';

import useStyles from './styles';
import Input from '../../Auth/Input';
import { editShoe } from '../../../api/apiService'

const EditShoeModal = ({open, onSuccess, handleClose, shoe}) => {
  const classes = useStyles();
  
  const [formData, setFormData] = React.useState(shoe);
  const [alert, setAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [response, setResponse] = React.useState('');
  
  const handleAlert = () => {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 6000);
  };
  
  React.useEffect(() =>{
     setFormData(shoe);
  },[shoe]);
  
  const handleChange= (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const updatedShoe = new FormData();
    updatedShoe.append('name', formData.name);
    updatedShoe.append('price', formData.price);
  if (formData.image instanceof File) {
    updatedShoe.append('image', formData.image);
    }
    
  const {id} = shoe;
   try {
      const response = await editShoe(id, updatedShoe);
     if (response && response.success) {
       handleClose();
       onSuccess(id);
       setResponse(`${shoe.name} edited successfully..`);
         setSeverity('success');
         handleAlert();
     }
   } catch (error) {
     setResponse(error.message);
     setSeverity('error');
     handleAlert();
   }
};
  
  return (
  <Modal 
     open={open}
     onClose={handleClose}
     BackDropComponent={Fade}
      >
   <Box className={classes.modal}>
    <Typography className={classes.heading} variant="h4" align="center" gutterBottom>Edit {shoe.name}</Typography>
    
     {alert && <Alert sx={{border: 'none', margin: 0,}} variant='outlined' severity={severity} >{response}</Alert>}
     
     <form className={classes.form} onSubmit={handleSubmit} >
 
        <Input name='name' label='Shoe Name' value={formData.name} handleChange={handleChange} />
        
        <Input name='price' label='Shoe Price' value={formData.price} handleChange={handleChange} />
        
        <Input name='image' label='Shoe Image' handleFileChange={handleFileChange} />
        
        <ButtonGroup className={classes.buttons} variant='contained' fullWidth>
          <Button type='submit' >Save Changes</Button>
          <Button color='error' onClick={handleClose} >Cancel</Button>
        </ButtonGroup>
     </form>
    
    </Box>
  </Modal>
  );
};

export default EditShoeModal;
