import React from 'react';
import { Container, Box, Typography} from '@mui/material'
import useStyles from './styles'

import {fetchDashboardMetrics} from '../../api/apiService';


const Dashboard = () => {
  const classes = useStyles();
  
  const [metrics, setMetrics] = React.useState({
       totalUsers: 0,
       totalAdmins: 0,
       activeUsers: 0
  });
  const [recentActivity, setRecentActivity] = React.useState([]);
  const [error, setError] = React.useState(null);
  
  
 const getDashboardMetrics = async () => {
      try {
        const {data} = await fetchDashboardMetrics()
        
        setRecentActivity(data.recentActivity || []);
        setMetrics({
             totalUsers: data.metrics.totalUsers || 0,
             totalAdmins: data.metrics.totalAdmins || 0,
             activeUsers: data.metrics.activeUsers || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      setError('Failed to load dashboard metrics. Please try again later.');
  }};
  
  
  React.useEffect(() => {
    getDashboardMetrics()
  },[]);
  
  return (
   <Container>
    {error && <Typography color="error">{error}</Typography>}
    
   <Container className={classes.metricsContainer}>
      <Typography variant="h3" align="center" className={classes.metricsHeader}>
        Metrics
      </Typography>

      <Box className={classes.metricsDataContainer}>
        <Box className={classes.metricBox}>
          <Typography variant="body2" className={classes.metricTitle}>
            Total Users
          </Typography>
          <Typography className={classes.metricValue}>
            {metrics.totalUsers}
          </Typography>
        </Box>

        <Box className={classes.metricBox}>
          <Typography variant="body2" className={classes.metricTitle}>
            Total Admins
          </Typography>
          <Typography className={classes.metricValue}>
            {metrics.totalAdmins}
          </Typography>
        </Box>

        <Box className={classes.metricBox}>
          <Typography variant="body2" className={classes.metricTitle}>
            Active Users
          </Typography>
          <Typography className={classes.metricValue}>
            {metrics.activeUsers}
          </Typography>
        </Box>
      </Box>
    </Container>
    
      <Box className={classes.recentActivity}>
          <Typography variant='h3' align='center' >
               Recent Activity
          </Typography>
      {recentActivity.length > 0 ? (
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>
                {new Date(activity.createdAt).toLocaleString()}: {activity.action}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activities available.</p>
        )}

      </Box>
      
          
   </Container>
    )
};
export default Dashboard;