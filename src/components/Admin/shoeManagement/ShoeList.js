import EditShoeModal from './EditShoeModal';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Box, Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchShoes, deleteShoe } from '../../../api/apiService';

const ShoeList = ({shoeUpdate}) => {
  const [shoes, setShoes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError ] = React.useState(false);
  const [editShoe, setEditShoe] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedShoe, setSelectedShoe] = React.useState(null);
  
  const getShoes = async () => {
     try {
        const data = await fetchShoes()
       setShoes(data);
      } catch (error) {
          setError(true);
        } finally {setIsLoading(false)}
  };
 
 const removeShoe = async (id) => {
   try {
      await deleteShoe(id);
     getShoes();
   } catch (error) {
     
   }
 };
 
 

  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false); 

  const handleDeleteClick = (shoe) => {
    setSelectedShoe(shoe); 
    handleOpen(); 
  };

  const handleConfirmDelete = () => {
    removeShoe(selectedShoe.id) 
    setOpen(false); 
  };

  
  const handleEditClick = (shoe) => {
    setEditShoe((shoe));
    setIsOpen(true);
  };
  
  const cancelEditShoe = () => {
    setEditShoe(null);
    setIsOpen(false);
  };
  
  const handleEditShoeSuccess = (id) => {
    getShoes();
    
  };

  React.useEffect(() => {
    getShoes();
  }, [shoeUpdate]);

  if (isLoading) {
    return <Typography variant="h6">Loading shoes...</Typography>;
  }
  
  if (error) {
    console.error('Error fetching shoes:', error);
    return <div>Error fetching shoes: {error.message}</div>;
  };

  return (
  <>
    <Box sx={{marginTop: 3,}} >
      
      <Grid container spacing={2}>
        {shoes.map((shoe) => (
          <Grid item xs={12} sm={6} md={4} key={shoe.id}>
            <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.75)',backdropFilter: 'blur(4px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',}} >
              <CardMedia
                component="img"
                height="200px"
                image={shoe.imageUrl}
                alt={shoe.name}
              />
              <CardContent>
                <Typography variant="h6">{shoe.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  KSH {shoe.price}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(shoe)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(shoe)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedShoe?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      { editShoe && (<EditShoeModal
        shoe={editShoe}
        handleClose={cancelEditShoe}
        open={isOpen}
        onSuccess={handleEditShoeSuccess}
    />)}
  </>
  );
};

export default ShoeList;
