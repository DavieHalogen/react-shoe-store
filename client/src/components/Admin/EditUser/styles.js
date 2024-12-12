import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(7px)',
    borderRadius: 6,
    padding: '5px',
  },
  
  heading: {
    paddingTop: '17px',
  },
  
  form: {
    marginTop: theme.spacing(3),
  },
  
  buttons: {
    gap: 5,
    marginBlock: theme.spacing(3),
  },
  
}));