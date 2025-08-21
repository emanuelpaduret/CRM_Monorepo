import { Box, Typography, Card, CardContent } from '@mui/joy';
import { useState, useEffect } from 'react';

function Leads({ user }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  return (
    <Box sx={{ p: 3 }}>
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
          Leads
        </Typography>
        <Typography 
          level="body-lg" 
          sx={{ 
            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
          }}
        >
          Manage your potential customers and leads.
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
            Leads Management
          </Typography>
          <Typography 
            level="body-md" 
            sx={{ 
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
            }}
          >
            This page will contain lead management features, forms, and tracking.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Leads;
