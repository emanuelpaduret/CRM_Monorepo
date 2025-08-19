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
import { auth, setTempToken } from '../services/api';

/**
 * Login page component.
 *
 * Renders a simple login form that posts credentials to the backend. On a
 * successful response the authentication token and user information are stored
 * in localStorage only when the user opts to be remembered; otherwise the token
 * is kept in memory for the session and cleared on logout. The parent callback
 * is notified so the rest of the app can update accordingly.
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
      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setTempToken(null);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTempToken(token);
      }
      onLogin(user);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at center, #182e59ff 0%, #0d1117 100%), rgba(0,0,0,0.4)',
        backgroundBlendMode: 'multiply',
        color: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            p: 4,
            backgroundColor: '#0d1117',
            borderRadius: 2,
            border: '1px solid #2f3b52',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#e0e0e0' }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
              variant="filled"
              InputLabelProps={{ sx: { color: '#e0e0e0' } }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  color: '#e0e0e0',
                  backgroundColor: '#06090f',
                  borderRadius: 1,
                },
              }}
              sx={{ mx: 'auto' }}
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
              variant="filled"
              InputLabelProps={{ sx: { color: '#e0e0e0' } }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  color: '#e0e0e0',
                  backgroundColor: '#06090f',
                  borderRadius: 1,
                },
              }}
              sx={{ mx: 'auto' }}
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
              sx={{ color: '#e0e0e0', width: '100%', mx: 'auto' }}
            />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: '100%',
                mx: 'auto',
                backgroundColor: '#ffffff',
                color: '#1b263b',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;