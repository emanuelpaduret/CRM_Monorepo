import { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { CssBaseline, GlobalStyles } from '@mui/joy';
import Login from './pages/Login';
import { setTempToken } from './services/api';

// Create Joy UI theme
const theme = extendTheme({
  fontFamily: {
    body: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setTempToken(null);
      setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Welcome {user.name}!</h1>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </CssVarsProvider>
  );
}

export default App;