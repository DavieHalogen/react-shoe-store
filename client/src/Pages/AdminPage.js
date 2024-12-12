import React from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import getRoleFromToken from '../utils/getRoleFromToken.js';
import useStyles from './styles';

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const role = getRoleFromToken();

  if (role !== 'admin') return <Navigate to="/" />;

  const currentTab = location.pathname;

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <>
      <Box className={classes.box}
      sx={{width: '100%',
            typography: 'body1',
            backgroundColor: '#b500e4',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: 2,
            marginBottom: 2,}}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
         className={classes.tabs}
          sx={{
            '.MuiTabs-flexContainer': {
              justifyContent: 'space-evenly',
            },
            '.MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              color: '#ffffff',
              '&:hover': {
                color: '#1976d2',
              },
              '&.Mui-selected': {
                color: '#1976d2',
              },
            },
            '.MuiTabs-indicator': {
              backgroundColor: '#1976d2',
              height: '3px',
            },
          }}
        >
          <Tab label="Dashboard" value="/admin/dashboard" />
          <Tab label="User Management" value="/admin/users" />
          <Tab label="Shoe Management" value="/admin/shoes" />
        </Tabs>
      </Box>

      <Box sx={{ marginTop: 2, padding: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminPage;