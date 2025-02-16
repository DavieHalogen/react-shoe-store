import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({ 
  name, 
  value,
  handleChange, 
  label, 
  half, 
  autoFocus, 
  type, 
  handleShowPassword, 
  handleFileChange 
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    {name === 'image' ? (
      <TextField
        name={name}
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
        label={label}
        type="file"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: 'image/*',
        }}
      />
    ) : (
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        variant="outlined"
        required
        margin='normal'
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
      />
    )}
  </Grid>
);

export default Input;
