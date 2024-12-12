import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  shoeimg : {
    borderRadius: 7,
    height: 280,
    width: 190,
    marginTop: 0,
  },
  
  shoecard : {
    padding: 3,
    borderRadius: 2,
    width: 300,
    height: 420,
    boxShadow: 3,
    transition: 'transform 0.2s',
    "&:hover": {
      transform: 'scale(1.02)',
    
    }
  }, 
  
  
  
}));

export default useStyles;
