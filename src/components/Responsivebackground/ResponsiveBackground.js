import React from 'react';
import Box from '@mui/material/Box';
import { fetchBackgroundImages } from '../../api/apiService';

const ResponsiveBackground = ({ children }) => {
  const [backgroundImages, setBackgroundImages] = React.useState([]);
  const [backgroundImage, setBackgroundImage] = React.useState(null);

  React.useEffect(() => {
    const getBackgroundImages = async () => {
      try {
        const images = await fetchBackgroundImages();
        setBackgroundImages(images);
      } catch (error) {
        console.error('Error fetching background images:', error);
      }
    };
    getBackgroundImages();
  }, []);

  React.useEffect(() => {
    if (backgroundImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }
  }, [backgroundImages]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveBackground;
