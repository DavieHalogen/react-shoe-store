import React from "react";
import Box from '@mui/material/Box';

export default function Footer() {
  return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: 'white', 
        }}
      >
        <h1>Welcome to the Shoe Store</h1>
        <p>Find your perfect pair!</p>
      </Box>
  );
}

