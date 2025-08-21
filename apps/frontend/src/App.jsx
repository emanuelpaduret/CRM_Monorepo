import { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { CssBaseline, GlobalStyles } from '@mui/joy';
import Login from './pages/Login';
import Home from './pages/Home';
import Customers from './pages/Customers/Customers';
import Leads from './pages/Customers/Leads';
import Booked from './pages/Customers/Booked';
import Completed from './pages/Customers/Completed';
import Layout from './components/Layout/Layout';
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
  const [currentPage, setCurrentPage] = useState('home');

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <Layout user={user} onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage}>
          {currentPage === 'home' && <Home user={user} />}
          {currentPage === 'customers' && <Customers user={user} />}
          {currentPage === 'leads' && <Leads user={user} />}
          {currentPage === 'booked' && <Booked user={user} />}
          {currentPage === 'completed' && <Completed user={user} />}
        </Layout>
      )}
    </CssVarsProvider>
  );
}

export default App;