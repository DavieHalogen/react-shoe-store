import AdminPage from './Pages/AdminPage';
import LoginPage from './Pages/LoginPage';
import ClientPage from './Pages/ClientPage';
import Dashboard from './components/Admin/Dashboard';
import UserManagement from './components/Admin/UserManagement';
import ShoeManagement from './components/Admin/ShoeManagement';
import MyAppBar from './components/Myappbar/MyAppBar';
import Footer from './components/Footer/Footer';
import ResponsiveBackground from './components/Responsivebackground/ResponsiveBackground';


import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const theme = createTheme({
  
});

function App() {
  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
           <ResponsiveBackground>
             <MyAppBar />
               <Routes>
                 <Route path='/' element={<ClientPage />}/>
                 <Route path='/login' element={<LoginPage />}/>
                 
                 <Route 
                      path='/admin' 
                      element={<AdminPage/> }
                 >
                    <Route 
                      path="dashboard" 
                      element={<Dashboard />} 
                    />
                    <Route 
                       path="users" 
                       element={<UserManagement />} 
                    />
                    <Route 
                    path="shoes" 
                    element={<ShoeManagement />} 
                    />
                    </Route>
               </Routes>
             <Footer />
           </ResponsiveBackground>
        </Router>
    </ThemeProvider>
  );
}

export default App;
