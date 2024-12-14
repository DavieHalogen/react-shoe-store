import React from 'react';
import Box from '@mui/material/Box';
import {fetchBackgroundImages} from '../../api/apiService'

const ResponsiveBackground = ({children}) => {
  const [ backgroundImages, setBackgroundImages ] = React.useState([]);
  
  React.useEffect(() =>{
    const getBackgroundImages = async () => {
      try {
        const images = await fetchBackgroundImages();
        setBackgroundImages(images);
      } catch (error) {
        console.log('Error fetching background images', error)
      }
    };
     getBackgroundImages();
  }, []);
  
  
 const [backgroundImage, setBackgroundImage] = React.useState      ({       
           imageUrl: null,
           id: ""
          }
  )
  
  
  React.useEffect(() =>{
    function getBackgroundImage()  {
        const randomNumber = Math.floor(Math.random() * backgroundImages.length);
        const URL = backgroundImages[randomNumber]
        setBackgroundImage(prevImage => ({
            ...prevImage, imageUrl: URL
        }
     ))
    }
    getBackgroundImage()
  }, [backgroundImages]);
  
  
  
  
  return (
     <Box
        sx={{
          minHeight: '100vh',       // Full viewport height
          backgroundImage: `url(${backgroundImage.imageUrl})`,
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
}

export default ResponsiveBackground;