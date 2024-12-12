import React from "react";
import moment from 'moment';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Typography, Checkbox, Button, Box, CircularProgress, Alert } from '@mui/material';

import useStyles from './styles';
import EditUserModal from '../EditUser/EditUserModal';
import { fetchUsers, deleteUser, switchUserStatus} from '../../../api/apiService';

const UserTable = ({userUpdate}) => {
  const classes = useStyles();
  
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [editUser, setEditUser] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  
 const loadUsers = React.useCallback(async () => {
    try {
      const {data} = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError(true)
    } finally {setIsLoading(false)}
  }, []);
  
  React.useEffect(() => {
   loadUsers()  
  } ,[userUpdate, loadUsers]);
  
  const toggleUserStatus = async (id, username, status, isActive) => {
    try {
      const response = await switchUserStatus(id);
        if (response && response.success) {
          setUsers((prevUsers) => 
          prevUsers.map((user) => 
          user.id === id ? {...user, status: isActive ? 'active' : 'inactive'} : user));
      const newStatus = isActive ? 'active' : 'inactive';
          setResponse(`${username}'s status changed to ${newStatus}`)
          setSeverity('success');
          handleAlert();
        }
    } catch (error) {
      
    }
  };
  
  const handleEditClick = (user) => {
    setEditUser(user);
    setIsOpen(true);
  };
  
  const cancelEditUser = () => {
    setEditUser(null);
    setIsOpen(false);
  };
  
  const handleEditUserSuccess = (id) => {
    loadUsers();
    setResponse(`User with id ${id} updated successfully.`);
    setSeverity('success');
    handleAlert();
  };
  
  const removeUser = async  (id, username) => {
    try {
     const response = await deleteUser(id);
       if (response && response.success) {
         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
         setResponse(`${username} was  deleted successfully..`);
         setSeverity('success');
         handleAlert();
       }
    } catch (error) {
     setResponse('User not deleted.Try again later.');
     setSeverity('error');
     handleAlert();
    }
  };
  
  const handleAlert = () => {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 6000);
  };
  
  if (isLoading) return <CircularProgress align='center'sx={{marginTop: '10px'}} />
  if (error) return <Typography color='error'>Error fetching users:{error}</Typography>
  
  return (
  <>
    <Box className={classes.table}>
    <Typography variant="h6" align="center" sx={{ margin: 2, marginTop: '20px' }}>Users</Typography>
    
    {alert && <Alert sx={{border: 'none', margin: 0,}} variant='outlined' severity={severity} >{response}</Alert>}
    
    <TableContainer  sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" style={{ color: 'red' }}>
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.registrationDate
                    ? moment(user.registrationDate).format('MMMM Do YYYY, h:mm:ss A') : 'N/A'}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.status === 'active'}
                    onChange={(e) => toggleUserStatus(user.id, user.username, user.status, e.target.checked)}
                    color="success"
                  />
                  <Typography
                    component="span"
                    sx={{
                      color: user.status === 'inactive' ? 'red' : 'green',
                      marginLeft: 1,
                    }}
                  >
                    {user.status}
                  </Typography>
                </TableCell>
                <TableCell  >
                 <Box className={classes.action} >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.actionButtons}
                    onClick={() => handleEditClick(user)}
                    disabled={user.status === 'inactive'}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    className={classes.actionButtons}
                    onClick={() => removeUser(user.id, user.username)}
                    disabled={user.status === 'inactive'}
                  >
                    Delete
                  </Button>
                 </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    { editUser && (<EditUserModal 
        user={editUser}
        handleClose={cancelEditUser}
        open={isOpen}
        onSuccess={handleEditUserSuccess}
    />)};
  </>
)};
export default UserTable;