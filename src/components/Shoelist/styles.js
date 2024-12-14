import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  shoeimg : {
    borderRadius: 7,
    width: '100%',
    aspectRatio: '3/2.6',
    objectFit: 'cover',
    marginTop: 0,
  },
  
  shoecard : {
    padding: 3,
    borderRadius: 2,
    //width: '100%',
  //  maxWidth: 300,
    height: '100%',
    boxShadow: 3,
    transition: 'transform 0.2s',
    "&:hover": {
      transform: 'scale(1.02)',
    
    }
  }, 
  
  
  
}));

export default useStyles;
