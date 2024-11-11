import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const RegistrationPage = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    // Basic email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateDisplayName = (name) => {
    const namePattern = /^[a-zA-Z0-9 ]*$/;
    return namePattern.test(name);
  };

  const validatePassword = (password) => {
     const passwordPattern = /^[a-zA-Z0-9]{1,20}$/;
    return passwordPattern.test(password);
  };
  
  const handleRegister = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!validateDisplayName(displayName)) {
      setError('Display name should not contain special characters');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password should be max 20 characters and contain no special characters');
      return;
    }
    const existingUser = JSON.parse(localStorage.getItem('user'));

    if (existingUser && existingUser.email === email) {
      setError('User already registered with this email');
      return;
    }

    const newUser = {displayName, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setSuccess(true);
    setError('');
    onRegister();
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error" style={{ marginBottom: 16 }}>{error}</Alert>}
        {success && <Alert severity="success" style={{ marginBottom: 16 }}>Registration Successful!</Alert>}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
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
          onClick={handleRegister}
          style={{ marginTop: 16 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
