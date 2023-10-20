import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const LoginDialog = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here (e.g., check credentials)
    if (username === 'user' && password === 'password') {
      onLogin(username);
      onClose();
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;


