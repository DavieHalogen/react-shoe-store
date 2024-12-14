import React from 'react';
import { Container, Grid , Card, CardContent, CardMedia, Typography, CircularProgress, Grow } from '@mui/material'

import { fetchShoes } from '../../api/apiService'
import useStyles from './styles'

const ShoesList = () => {
  const classes = useStyles();
  const [shoes, setShoes ] = React.useState([]);
  const [isLoading, setIsLoading ] = React.useState(true);
  const [error, setError ] = React.useState(false);
  
  React.useEffect(() => {
      const getShoes = async () => {
        try {
          const data = await fetchShoes()
          setShoes(data)
        } catch (error) {
          setError(true)
        } finally {setIsLoading(false)}
      };
      
    getShoes()
  }, []);

  if (isLoading) return <CircularProgress margintop='15px'/>;
  
  if (!shoes.length && !isLoading) return 
              <Typography variant='h3' 
                    align='center' 
                    marginTop='15px' >No shoes..
              </Typography>;
  
  if (error) {
    console.error('Error fetching shoes:', error);
    return <div>Error fetching shoes: {error.message}</div>;
  };
  
  return (
  <Grow in>
    <Container align='center' >
          <Typography variant='h2' >
           Shoe List
          </Typography>
      <Grid container spacing = {2} justify='space-between' alignItems='stretch'  >
         {shoes.map((shoe) => (
           <Grid 
           sx = {{ margin: 1,}}
           sm={4} md={3} xs={6} lg={2}
           key = {shoe.id}
           >
             <Card 
               className = {classes.shoecard}
              >
                <CardMedia
                   className = {classes.shoeimg}
                   component = 'img'
                   image = {shoe.imageUrl}
                />
                <CardContent> 
                  <Typography variant='h4' >
                    {shoe.name}
                  </Typography>
                  <Typography variant='subtitle1' >
                    Price: KES {shoe.price}
                  </Typography>
                </CardContent>
             </Card>
           </Grid>
         ))}
      </Grid>
    </Container>
  </Grow>
    )
  
};
  

export default ShoesList;