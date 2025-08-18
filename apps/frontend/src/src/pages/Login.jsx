import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  SvgIcon,
} from '@mui/material';
import { auth } from '../services/api';

/**
 * Login page component.
 *
 * Renders a simple login form that posts credentials to the backend. On a
 * successful response the authentication token and user information are stored
 * in localStorage and the parent callback is notified so the rest of the app
 * can update accordingly.
 */
function LockOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 17a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6h-1V9a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2zm-8-2a3 3 0 0 1 6 0v2H10V9zm8 10H6v-6h12v6z" />
    </SvgIcon>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const { data } = await auth.login(email, password);
      const { token, user } = data;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at center, #0d1117 0%, #1b263b 100%)',
        color: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: '#e0e0e0' }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ sx: { color: '#e0e0e0' } }}
            InputProps={{ sx: { color: '#e0e0e0' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ sx: { color: '#e0e0e0' } }}
            InputProps={{ sx: { color: '#e0e0e0' } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#e0e0e0' } }}
              />
            }
            label="Remember me"
            sx={{ color: '#e0e0e0' }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
