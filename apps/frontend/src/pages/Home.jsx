import { Box, Typography, Card, CardContent, Grid, Stack, Button, Chip } from '@mui/joy';
import { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Home({ user }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Mock data - replace with real API calls later
  const stats = {
    totalLeads: 24,
    bookedToday: 3,
    completedThisWeek: 12,
    revenue: '$8,450'
  };

  const recentLeads = [
    { id: 1, name: 'John Smith', phone: '+1 (555) 123-4567', status: 'new', time: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', phone: '+1 (555) 987-6543', status: 'contacted', time: '4 hours ago' },
    { id: 3, name: 'Mike Davis', phone: '+1 (555) 456-7890', status: 'booked', time: '6 hours ago' },
  ];

  const upcomingBookings = [
    { id: 1, customer: 'Emily Wilson', time: '2:00 PM', address: '123 Oak Street' },
    { id: 2, customer: 'Robert Brown', time: '4:30 PM', address: '456 Pine Avenue' },
    { id: 3, customer: 'Lisa Garcia', time: '6:00 PM', address: '789 Maple Drive' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          level="h2" 
          sx={{ 
            color: isDarkMode ? '#ffffff' : '#1a202c',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography 
          level="body-lg" 
          sx={{ 
            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
          }}
        >
          Here's what's happening with your moving business today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
            borderColor: isDarkMode ? '#333' : '#e2e8f0',
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  backgroundColor: '#3b82f6',
                  color: 'white'
                }}>
                  <PeopleIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {stats.totalLeads}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Total Leads
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
            borderColor: isDarkMode ? '#333' : '#e2e8f0',
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  backgroundColor: '#10b981',
                  color: 'white'
                }}>
                  <CalendarTodayIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {stats.bookedToday}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Booked Today
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
            borderColor: isDarkMode ? '#333' : '#e2e8f0',
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  backgroundColor: '#f59e0b',
                  color: 'white'
                }}>
                  <HomeIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {stats.completedThisWeek}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Completed This Week
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
            borderColor: isDarkMode ? '#333' : '#e2e8f0',
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  backgroundColor: '#8b5cf6',
                  color: 'white'
                }}>
                  <TrendingUpIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {stats.revenue}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Weekly Revenue
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          level="h4" 
          sx={{ 
            color: isDarkMode ? '#ffffff' : '#1a202c',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          Quick Actions
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            startDecorator={<AddIcon />}
            sx={{
              backgroundColor: '#3b82f6',
              '&:hover': { backgroundColor: '#2563eb' }
            }}
          >
            Add New Lead
          </Button>
          <Button
            startDecorator={<CalendarTodayIcon />}
            variant="outlined"
            sx={{
              borderColor: isDarkMode ? '#333' : '#e2e8f0',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              '&:hover': { 
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderColor: isDarkMode ? '#666' : '#cbd5e1'
              }
            }}
          >
            Schedule Booking
          </Button>
          <Button
            startDecorator={<PhoneIcon />}
            variant="outlined"
            sx={{
              borderColor: isDarkMode ? '#333' : '#e2e8f0',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              '&:hover': { 
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderColor: isDarkMode ? '#666' : '#cbd5e1'
              }
            }}
          >
            Follow Up Call
          </Button>
        </Stack>
      </Box>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Recent Leads */}
        <Grid xs={12} md={6}>
          <Card sx={{ 
            backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
            borderColor: isDarkMode ? '#333' : '#e2e8f0',
            transition: 'all 0.3s ease',
            height: 'fit-content'
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
                Recent Leads
              </Typography>
              <Stack spacing={2}>
                {recentLeads.map((lead) => (
                  <Box 
                    key={lead.id}
                    sx={{ 
                      p: 2, 
                      borderRadius: 2, 
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography 
                          level="body-sm" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: isDarkMode ? '#ffffff' : '#1a202c'
                          }}
                        >
                          {lead.name}
                        </Typography>
                        <Typography 
                          level="body-xs" 
                          sx={{ 
                            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            mb: 0.5
                          }}
                        >
                          {lead.phone}
                        </Typography>
                        <Typography 
                          level="body-xs" 
                          sx={{ 
                            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)'
                          }}
                        >
                          {lead.time}
                        </Typography>
                      </Box>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={
                          lead.status === 'new' ? 'primary' :
                          lead.status === 'contacted' ? 'warning' : 'success'
                        }
                      >
                        {lead.status}
                      </Chip>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Bookings */}
        <Grid xs={12} md={6}>
          <Card sx={{ 
            backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
            borderColor: isDarkMode ? '#333' : '#e2e8f0',
            transition: 'all 0.3s ease',
            height: 'fit-content'
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
                Today's Bookings
              </Typography>
              <Stack spacing={2}>
                {upcomingBookings.map((booking) => (
                  <Box 
                    key={booking.id}
                    sx={{ 
                      p: 2, 
                      borderRadius: 2, 
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography 
                          level="body-sm" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: isDarkMode ? '#ffffff' : '#1a202c'
                          }}
                        >
                          {booking.customer}
                        </Typography>
                        <Typography 
                          level="body-xs" 
                          sx={{ 
                            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            mb: 0.5
                          }}
                        >
                          {booking.address}
                        </Typography>
                      </Box>
                      <Chip
                        size="sm"
                        variant="soft"
                        color="primary"
                      >
                        {booking.time}
                      </Chip>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
