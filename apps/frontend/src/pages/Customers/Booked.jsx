import { Box, Typography, Card, CardContent } from '@mui/joy';
import { useState, useEffect } from 'react';

function Booked({ user }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          level="h2" 
          sx={{ 
            color: isDarkMode ? '#ffffff' : '#1a202c',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          Booked
        </Typography>
        <Typography 
          level="body-lg" 
          sx={{ 
            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
          }}
        >
          View and manage your booked appointments and scheduled moves.
        </Typography>
      </Box>

      {/* Content */}
      <Card sx={{ 
        backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
        borderColor: isDarkMode ? '#333' : '#e2e8f0',
        transition: 'all 0.3s ease'
      }}>
        <CardContent>
          <Typography 
            level="h4" 
            sx={{ 
              color: isDarkMode ? '#ffffff' : '#1a202c',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Booked Appointments
          </Typography>
          <Typography 
            level="body-md" 
            sx={{ 
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
            }}
          >
            This page will contain scheduled moves, calendar view, and booking management.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Booked;
