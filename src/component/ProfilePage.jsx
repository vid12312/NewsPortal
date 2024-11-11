import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const ProfilePage = ({ onLogout, goToHome }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setDisplayName(storedUser.displayName);
    }
  }, []);

  const validatePassword = (password) => {
    
    const passwordPattern = /^[a-zA-Z0-9]{1,20}$/;
    return passwordPattern.test(password);
  };

  const validateDisplayName = (name) => {
    
    const namePattern = /^[a-zA-Z0-9 ]*$/;
    return namePattern.test(name);
  };

  const handleUpdate = () => {
    if (!validateDisplayName(displayName)) {
      setError('Display name should not contain special characters');
      return;
    }

    if (password && !validatePassword(password)) {
      setError('Password should be max 20 characters and contain no special characters');
      return;
    }

    const updatedUser = { ...user, displayName, password: password || user.password };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage('Profile updated successfully!');
    setError('');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    onLogout(); 
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        {error && <Alert severity="error" style={{ marginBottom: 16 }}>{error}</Alert>}
        {message && <Alert severity="success" style={{ marginBottom: 16 }}>{message}</Alert>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user?.email || ''}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpdate}
          style={{ marginTop: 16 }}
        >
          Update Profile
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleDeleteAccount}
          style={{ marginTop: 16 }}
        >
          Delete Account
        </Button>
      </Box>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={goToHome} style={{ marginRight: 10 }}>
          Back to Home
        </Button>
        <Button variant="contained" color="secondary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
