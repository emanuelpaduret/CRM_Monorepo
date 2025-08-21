import { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Stack, Avatar, Input } from '@mui/joy';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Layout component that provides the main structure for authenticated pages
function Layout({ children, user, onLogout, onPageChange, currentPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [customersExpanded, setCustomersExpanded] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: isDarkMode ? 'rgb(0, 0, 0)' : 'rgb(248, 250, 252)',
      transition: 'background-color 0.3s ease'
    }}>
             {/* Sidebar */}
       <Box
         sx={{
           position: 'fixed',
           top: 0,
           left: 0,
           height: '100vh',
           width: sidebarOpen ? 260 : 0,
           backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
           borderRight: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`,
           transition: 'width 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
           overflow: 'hidden',
           display: { xs: 'none', md: 'block' },
           display: 'flex',
           flexDirection: 'column',
           zIndex: 1000,
         }}
       >
        {/* Sidebar header */}
        <Box sx={{ pt: 2, pl: 2, pr: 1.5, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            {/* Logo and company name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: ' #106ccc',
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                M
              </Box>
              <Typography level="h4" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c', fontWeight: 'bold' }}>
                MyMover
              </Typography>
            </Box>
            
            {/* Dark mode toggle */}
            <Box
              onClick={toggleTheme}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(248, 250, 252)',
                borderRadius: 5,
                border: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? '#ffffff' : '#1a202c',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#5a6a7a' : '#e2e8f0',
                },
              }}
            >
              {isDarkMode ? (
                <LightModeIcon sx={{ fontSize: 18, color: '#ffffff' }} />
              ) : (
                <DarkModeIcon sx={{ fontSize: 18, color: '#1a202c' }} />
              )}
            </Box>
          </Box>

          {/* Search input field */}
          <Box sx={{ mt: 2 }}>
            <Input
              placeholder="Search"
              size="sm"
              startDecorator={<SearchIcon sx={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 18 }} />}
              sx={{
                backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(249, 250, 251)',
                borderColor: isDarkMode ? '#333' : '#d1d5db',
                color: isDarkMode ? '#e5e7eb' : '#1f2937',
                borderRadius: 8,
                height: '36px',
                transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                '&:hover': {
                  borderColor: isDarkMode ? '#6b7280' : '#9ca3af',
                },
                '&:focus-within': {
                  borderColor: isDarkMode ? '#3b82f6' : '#2563eb',
                },
                '& .MuiInput-placeholder': {
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  transition: 'color 0.3s ease',
                },
              }}
            />
          </Box>
        </Box>

        {/* Sidebar content will go here */}
        <Box sx={{ flex: 1, pt: 0, px: 0, pb: 3 }}>
          {/* Navigation menu */}
          <Box sx={{ px: 2 }}>
            <Box>
                             {/* Home */}
               <Box
                 onClick={() => onPageChange('home')}
                 sx={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: 1.2,
                   p: 0.75,
                   borderRadius: 5,
                   cursor: 'pointer',
                   width: '100%',
                   mb: 1.2,
                   color: isDarkMode ? '#ffffff' : '#1a202c',
                   backgroundColor: currentPage === 'home' ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
                   transition: 'background-color 0.1s ease, color 0.3s ease',
                   '&:hover': {
                     backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                     color: isDarkMode ? '#e0e0e0' : '#2d3748',
                   },
                 }}
               >
                <HomeIcon sx={{ fontSize: 20, color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }} />
                <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: '13px', color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }}>
                  Home
                </Typography>
              </Box>

              {/* Customers with submenu */}
              <Box sx={{ mb: 1.2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    p: 0.75,
                    borderRadius: 5,
                    cursor: 'pointer',
                    width: '100%',
                    color: isDarkMode ? '#ffffff' : '#1a202c',
                    transition: 'background-color 0.1s ease, color 0.3s ease',
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      color: isDarkMode ? '#e0e0e0' : '#2d3748',
                    },
                  }}
                  onClick={() => setCustomersExpanded(!customersExpanded)}
                >
                  <PeopleIcon sx={{ fontSize: 20, color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }} />
                  <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: '13px', color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }}>
                    Customers
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, mt: 0.5, ml: 'auto' }}>
                    {customersExpanded ? (
                      <ExpandLessIcon sx={{ fontSize: 16, color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: 16, color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }} />
                    )}
                  </Box>
                </Box>

                {/* Customers submenu */}
                {customersExpanded && (
                  <Box 
                    sx={{ 
                      pl: 4.5,
                      mt: 0.5,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      opacity: 1,
                    }}
                  >
                    <Stack spacing={0.3}>
                      <Typography
                        onClick={() => onPageChange('customers')}
                        level="body-sm"
                        sx={{
                          color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          p: 0.4,
                          borderRadius: 2,
                          backgroundColor: currentPage === 'customers' ? (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') : 'transparent',
                          transition: 'background-color 0.1s ease',
                          '&:hover': {
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          },
                        }}
                      >
                        All
                      </Typography>
                      <Typography
                        onClick={() => onPageChange('leads')}
                        level="body-sm"
                        sx={{
                          color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          p: 0.4,
                          borderRadius: 2,
                          backgroundColor: currentPage === 'leads' ? (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') : 'transparent',
                          transition: 'background-color 0.1s ease',
                          '&:hover': {
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          },
                        }}
                      >
                        Leads
                      </Typography>
                      <Typography
                        onClick={() => onPageChange('booked')}
                        level="body-sm"
                        sx={{
                          color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          p: 0.4,
                          borderRadius: 2,
                          backgroundColor: currentPage === 'booked' ? (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') : 'transparent',
                          transition: 'background-color 0.1s ease',
                          '&:hover': {
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          },
                        }}
                      >
                        Booked
                      </Typography>
                      <Typography
                        onClick={() => onPageChange('completed')}
                        level="body-sm"
                        sx={{
                          color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          p: 0.4,
                          borderRadius: 2,
                          backgroundColor: currentPage === 'completed' ? (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') : 'transparent',
                          transition: 'background-color 0.1s ease',
                          '&:hover': {
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          },
                        }}
                      >
                        Completed
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </Box>

              {/* Calendar */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.2,
                  p: 0.75,
                  borderRadius: 5,
                  cursor: 'pointer',
                  width: '100%',
                  color: isDarkMode ? '#ffffff' : '#1a202c',
                  transition: 'background-color 0.1s ease, color 0.3s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    color: isDarkMode ? '#e0e0e0' : '#2d3748',
                  },
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: 20, color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }} />
                <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: '13px', color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }}>
                  Calendar
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Settings button */}
        <Box sx={{ px: 2, mb: -2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              p: 0.75,
              borderRadius: 5,
              cursor: 'pointer',
              width: '100%',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              transition: 'background-color 0.1s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                color: isDarkMode ? '#e0e0e0' : '#2d3748',
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: 20, color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }} />
            <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: '13px', color: isDarkMode ? 'rgb(210, 210, 210)' : 'rgb(74, 85, 104)' }}>
              Settings
            </Typography>
          </Box>
        </Box>

        {/* User profile at bottom */}
        <Box sx={{ p: 2, mt: 1, position: 'relative' }}>
          {/* Separating line with gaps */}
          <Box sx={{ borderTop: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`, mx: 0.5, mb: 2 }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: ' #106ccc',
                color: ' #e0e0e0',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                level="body-sm"
                sx={{
                  color: isDarkMode ? '#e0e0e0' : '#1a202c',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: 1.2,
                }}
              >
                {user?.name || 'User'}
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  color: isDarkMode ? 'rgb(196, 196, 196)' : 'rgb(113, 128, 150)',
                  fontSize: '12px',
                  lineHeight: 1.2,
                }}
              >
                {user?.email || 'user@example.com'}
              </Typography>
            </Box>
            <IconButton
              onClick={onLogout}
              size="sm"
              sx={{
                color: isDarkMode ? 'rgb(196, 196, 196)' : 'rgb(113, 128, 150)',
                position: 'absolute',
                top: 'calc(50% - 6px)',
                right: '2px',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: isDarkMode ? '#e0e0e0' : '#2d3748',
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>

             {/* Main content area */}
       <Box sx={{ 
         flex: 1, 
         display: 'flex', 
         flexDirection: 'column',
         marginLeft: sidebarOpen ? '260px' : 0,
         transition: 'margin-left 0.3s ease',
       }}>
         {/* Page content */}
         <Box
           sx={{
             flex: 1,
             p: 3,
             backgroundColor: isDarkMode ? '#000000' : '#ffffff',
             transition: 'background-color 0.3s ease',
             overflow: 'auto',
           }}
         >
           {children}
         </Box>
       </Box>
    </Box>
  );
}

export default Layout;
