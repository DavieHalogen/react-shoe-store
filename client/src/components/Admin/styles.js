import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  recentActivity: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(4px)',
    paddingBottom: 25,
    paddingTop: 8,
    borderRadius: 8,
  },
  
  metricsContainer: {
    margin: '0 auto',
    marginBottom: '25px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(4px)',
  },
  metricsHeader: {
    marginBottom: '20px',
  },
  metricsDataContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    flexWrap: 'wrap',
  },
  metricBox: {
    flex: '1 1 calc(33.33% - 20px)',
    maxWidth: 'calc(33.33% - 20px)',
    minWidth: '100px',
    backdropFilter: 'blur(4px)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    textAlign: 'center',
  },
  metricTitle: {
    marginBottom: '8px',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  
  // User Management
  
  paper: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(4px)',
    borderRadius: '8px',
    boxShadow: theme.shadows[5], 
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
 
  },

}))