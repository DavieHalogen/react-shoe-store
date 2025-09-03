import axios from 'axios';

const API_URL = 'https://react-shoe-store.onrender.com/api'; // Your Render backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token automatically if available
api.interceptors.request.use(
  (config) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
      const { token } = JSON.parse(profile);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= Shoes ================= */

export const fetchShoes = async () => {
  try {
    const response = await api.get('/shoes');
    return response.data; // image URLs already returned by backend
  } catch (error) {
    console.error('Error fetching shoes:', error);
    throw error;
  }
};

export const addShoe = async (shoeFormData) => {
  try {
    const response = await api.post('/shoes', shoeFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.status === 201) return { success: true, message: 'Shoe added successfully!', shoe: response.data };
  } catch (error) {
    if (error.response && error.response.status === 400) throw new Error('Image is required.');
    throw new Error('Something went wrong.');
  }
};

export const editShoe = async (id, updatedShoe) => {
  try {
    const response = await api.put(`/shoes/${id}`, updatedShoe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.status === 200) return { success: true, message: 'Shoe updated successfully!', shoe: response.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error('Shoe not found');
      if (error.response.status === 403) throw new Error('Access denied');
    }
    throw new Error('Something went wrong.');
  }
};

export const deleteShoe = async (id) => {
  try {
    const response = await api.delete(`/shoes/${id}`);
    if (response.status === 200) return { success: true, message: 'Shoe deleted successfully!' };
  } catch (error) {
    if (error.response && error.response.status === 403) throw new Error('Access denied');
    throw new Error('Something went wrong.');
  }
};

/* ================ Background Images ================ */

export const fetchBackgroundImages = async () => {
  try {
    const response = await api.get('/backgroundImages');
    return response.data; // array of image URLs
  } catch (error) {
    console.error('Error fetching background images:', error);
    throw new Error('Failed to fetch background images.');
  }
};

/* ================ Auth ================ */

export const signUp = async (formData) => {
  try {
    const response = await api.post('/users/signup', formData);
    if (response.status === 201) {
      localStorage.setItem('profile', JSON.stringify(response.data.result));
      return { success: true, message: 'Account created successfully!' };
    }
  } catch (error) {
    if (error.response && error.response.status === 409) throw new Error('Username or email already exists.');
    throw new Error('Something went wrong.');
  }
};

export const signIn = async (formData) => {
  try {
    const response = await api.post('/users/login', formData);
    if (response.status === 200) {
      localStorage.setItem('profile', JSON.stringify(response.data.result));
      return { success: true, message: 'Login successful.' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) throw new Error('Incorrect password.');
      if (error.response.status === 404) throw new Error('User not found.');
      if (error.response.status === 403) throw new Error('Your account is deactivated. Please contact support.');
    }
    throw new Error('Something went wrong.');
  }
};

/* ================ Admin ================ */

export const createAdmin = async (formData) => {
  try {
    const response = await api.post('/admin/create-admin', formData);
    if (response.status === 201) return { success: true, message: 'Admin account created successfully!' };
  } catch (error) {
    if (error.response && error.response.status === 409) throw new Error('Username or email already exists.');
    if (error.response && error.response.status === 403) throw new Error('Access denied.');
    throw new Error('Something went wrong.');
  }
};

export const fetchDashboardMetrics = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) throw new Error('Access denied.');
    throw new Error('Something went wrong.');
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) throw new Error('Access denied.');
    throw new Error('Something went wrong.');
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    if (response.status === 200) return { success: true, message: 'User deleted successfully.' };
  } catch (error) {
    if (error.response && error.response.status === 403) throw new Error('Access denied.');
    throw new Error('Something went wrong.');
  }
};

export const switchUserStatus = async (id) => {
  try {
    const response = await api.patch(`/admin/users/${id}/status`);
    if (response.status === 200) return { success: true, message: 'User status updated.' };
  } catch (error) {
    if (error.response && error.response.status === 403) throw new Error('Access denied.');
    throw new Error('Something went wrong.');
  }
};

export const editUser = async (id, formData) => {
  try {
    const response = await api.put(`/admin/users/${id}`, formData);
    if (response.status === 200) return { success: true, message: 'User updated successfully.' };
  } catch (error) {
    if (error.response && error.response.status === 403) throw new Error('Access denied.');
    throw new Error('Something went wrong.');
  }
};
