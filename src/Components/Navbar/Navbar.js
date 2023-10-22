import React, { useState, useEffect } from 'react';
import LOGO from '../../assets/Logo'
import {
  AppBar,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
  Grid,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const navbarStyles = {
  appBar: {
    backgroundColor: 'blue',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  button: {
    color: 'white',
  },
  dialog: {
    width: '100%', // Full width for responsiveness
    textAlign: 'center',
    margin: 'auto',
    marginTop: 100,
    padding: 20,
    borderRadius: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formField: {
    margin: '8px',
  },
  signupDialog: {
    marginLeft: 20,
  },
  horizontalForm: {
    display: 'flex',
    flexDirection: 'row',
  },
  snackbarSuccess: {
    backgroundColor: 'green',
    color: 'green',
  },
  snackbarError: {
    backgroundColor: 'red',
    color: 'red',
  },
};


function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      setUser(storedUserData);

    }
  }, []);
  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  const isEmailValid = (email) => {
    // Regular expression to check for a valid email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isUsernameValid = (username) => {
    // Username should be at least 3 characters long
    return username.length >= 3;
  };

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleSignupClick = () => {
    setSignupOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  const handleLoginSubmit = () => {
    if (!username || !password) {
      setSnackbarMessage('Please fill in all the fields.');
      setSnackbarType('error');
      setSnackbarOpen(true);
    } else if (user && username === user.username && password === user.password) {
      // Successful login logic here
      setUser(user);
      handleLoginClose();
     
    } else {
      setSnackbarMessage('Login failed. Please check your credentials.');
       clearFields(); // Clear input fields
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleSignupSubmit = () => {
    if (!isUsernameValid(username) || !isEmailValid(email) || !isUsernameValid(password) || !isUsernameValid(confirmPassword)) {
      setSnackbarMessage('Please fill in all the fields correctly.');
      setSnackbarType('error');
      setSnackbarOpen(true);
    } else if (password.length < 6) {
      setSnackbarMessage('Password must be at least 6 characters.');
      setSnackbarType('error');
      setSnackbarOpen(true);
    } else if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarType('error');
      setSnackbarOpen(true);
    } else {
      localStorage.setItem('user', JSON.stringify({ username, email, password }));
      setUser({ username, email, password });
      handleSignupClose();
      navigate('/product-creation');
      setSnackbarMessage('Signup successful.');
      setSnackbarType('success');
      setSnackbarOpen(true);
      clearFields();

    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');

  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div>
      <AppBar position="static" style={navbarStyles.appBar}>
        <CssBaseline />
        <Toolbar>
  <Typography variant="h6" style={navbarStyles.title}>
    <img src={LOGO} alt="logo" style={{ height: '40px' }} />
  </Typography>
  {user ? (
    <>
      <Typography variant="body1" color="inherit" style={{ textAlign: 'center' }}>
        Welcome, {user.username}
      </Typography>
      <Button style={navbarStyles.button} onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button style={navbarStyles.button} onClick={handleLoginClick}>
        Login
      </Button>
      <Button style={navbarStyles.button} onClick={handleSignupClick}>
        Signup
      </Button>
    </>
  )}
</Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Dialog open={loginOpen} onClose={handleLoginClose} style={navbarStyles.dialog}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <form style={navbarStyles.form}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  style={navbarStyles.formField}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  style={navbarStyles.formField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLoginClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleLoginSubmit} color="primary">
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dialog open={signupOpen} onClose={handleSignupClose} style={navbarStyles.dialog}>
            <DialogTitle>Signup</DialogTitle>
            <DialogContent>
              <form style={navbarStyles.form}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  style={navbarStyles.formField}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  style={navbarStyles.formField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  style={navbarStyles.formField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  style={navbarStyles.formField}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSignupClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSignupSubmit} color="primary">
                Signup
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{ style: { backgroundColor: snackbarType === 'success' ? 'green' : 'red' } }}
      />
    </div>
  );
}

export default Navbar;

