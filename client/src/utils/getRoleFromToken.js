import {jwtDecode} from 'jwt-decode';

const getRoleFromToken = () => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    try {
      const { token } = JSON.parse(profile);
      const decodedToken = jwtDecode(token);
        return decodedToken.role;
    } catch (error) {
    console.log('Invalid token')  
    };
  return null;
};
}

export default getRoleFromToken;