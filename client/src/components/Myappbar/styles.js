import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    height: 70,
    width: '100%',
  },
  heading: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  
  image: {
    marginRight: 'auto',
  },
  
  userName: {
    marginInline: 10,
  },
  
  button: {
    marginRight: '7px',
  },
  
  purple: {
    marginLeft: 4,
    color: theme.palette.secondary.main,
    backgroundColor: deepPurple,
  },
}));
