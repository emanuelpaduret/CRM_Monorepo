import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

// Component to handle authenticated routes
function AuthenticatedApp({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page) => {
    navigate(`/${page}`);
  };

  return (
    <Layout user={user} onLogout={onLogout} onPageChange={handlePageChange} currentPage={location.pathname.slice(1) || 'home'}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/customers" element={<Customers user={user} />} />
        <Route path="/leads" element={<Leads user={user} />} />
        <Route path="/booked" element={<Booked user={user} />} />
        <Route path="/completed" element={<Completed user={user} />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Layout>
  );
}

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
        localStorage.removeItem('lastPage');
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
      <Router>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <AuthenticatedApp user={user} onLogout={handleLogout} />
        )}
      </Router>
    </CssVarsProvider>
  );
}

export default App;