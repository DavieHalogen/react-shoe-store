import React from "react";
import { Modal, Typography, ButtonGroup, Button, Box, TextField, MenuItem, Fade } from '@mui/material';

import { editUser } from '../../../api/apiService';
import useStyles from './styles';

const EditUserModal = ({open, onSuccess, handleClose, user}) => {
  const classes = useStyles();
  
  const [formData, setFormData] = React.useState(user || {});
  
  React.useEffect(() =>{
     setFormData(user);
  },[user]);
  
  const handleChange= (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const {id} = user;
   try {
     const response = await editUser(id, formData);
     if (response && response.success) {
       handleClose();
       onSuccess(id);
     }
   } catch (error) {
     
   }
};
  
  return (
  <Modal 
     open={open}
     onClose={handleClose}
     BackDropComponent={Fade}
      >
   <Box className={classes.modal}>
    <Typography className={classes.heading} variant="h4" align="center" gutterBottom>Edit {user.username}</Typography>
      <form className={classes.form} onSubmit={handleSubmit} >
        <TextField
          fullWidth
          label='User Name'
          name='username'
          value={formData.username}
          onChange={handleChange}
          margin= 'normal'
        />
        <TextField
          fullWidth
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          margin= 'normal'
        />
        <TextField
          fullWidth
          label='Phone Number'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          margin= 'normal'
        /> 
        <TextField
        select
          label='Role'
          name='role'
          value={formData.role}
          onChange={handleChange}
          margin= 'normal'
          fullWidth
        >
        <MenuItem value='admin' >Admin</MenuItem>
        <MenuItem value='user' >User</MenuItem>
        </TextField>
        <ButtonGroup className={classes.buttons} variant='contained' fullWidth>
          <Button type='submit' >Save Changes</Button>
          <Button color='error' onClick={handleClose} >Cancel</Button>
        </ButtonGroup>
      </form>
    
    </Box>
  </Modal>
  );
};

export default EditUserModal;
