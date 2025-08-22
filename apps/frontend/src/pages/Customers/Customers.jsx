import { Box, Typography, Card, CardContent, Grid, Stack, Button, Chip, Input, IconButton } from '@mui/joy';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Customers({ user }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Mock data - replace with real API calls later
  const customers = [
    { 
      id: 1, 
      name: 'John Smith', 
      phone: '+1 (555) 123-4567', 
      email: 'john.smith@email.com',
      status: 'active',
      totalMoves: 2,
      lastMove: '2024-01-15',
      totalSpent: '$2,400'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      phone: '+1 (555) 987-6543', 
      email: 'sarah.j@email.com',
      status: 'active',
      totalMoves: 1,
      lastMove: '2024-01-20',
      totalSpent: '$1,800'
    },
    { 
      id: 3, 
      name: 'Mike Davis', 
      phone: '+1 (555) 456-7890', 
      email: 'mike.davis@email.com',
      status: 'inactive',
      totalMoves: 3,
      lastMove: '2023-12-10',
      totalSpent: '$3,600'
    },
    { 
      id: 4, 
      name: 'Emily Wilson', 
      phone: '+1 (555) 321-6540', 
      email: 'emily.w@email.com',
      status: 'active',
      totalMoves: 1,
      lastMove: '2024-01-25',
      totalSpent: '$2,100'
    },
    { 
      id: 5, 
      name: 'Robert Brown', 
      phone: '+1 (555) 789-0123', 
      email: 'robert.b@email.com',
      status: 'active',
      totalMoves: 2,
      lastMove: '2024-01-18',
      totalSpent: '$2,800'
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

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
          Customers
        </Typography>
        <Typography 
          level="body-lg" 
          sx={{ 
            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
          }}
        >
          Manage your customer database and view customer history.
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
                    {customers.length}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Total Customers
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
                  <PeopleIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {customers.filter(c => c.status === 'active').length}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Active Customers
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
                  <PeopleIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {customers.reduce((sum, c) => sum + c.totalMoves, 0)}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Total Moves
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
                  <PeopleIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography level="h3" sx={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                    {customers.reduce((sum, c) => sum + parseInt(c.totalSpent.replace('$', '').replace(',', '')), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                    Total Revenue
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Actions */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startDecorator={<SearchIcon />}
              sx={{
                backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(249, 250, 251)',
                borderColor: isDarkMode ? '#333' : '#d1d5db',
                color: isDarkMode ? '#e5e7eb' : '#1f2937',
                '&:hover': {
                  borderColor: isDarkMode ? '#6b7280' : '#9ca3af',
                },
                '&:focus-within': {
                  borderColor: isDarkMode ? '#3b82f6' : '#2563eb',
                },
              }}
            />
          </Box>
          <Button
            startDecorator={<FilterListIcon />}
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
            Filter
          </Button>
          <Button
            startDecorator={<AddIcon />}
            sx={{
              backgroundColor: '#3b82f6',
              '&:hover': { backgroundColor: '#2563eb' }
            }}
          >
            Add Customer
          </Button>
        </Stack>
      </Box>

      {/* Customers List */}
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
              mb: 3
            }}
          >
            Customer List ({filteredCustomers.length})
          </Typography>
          
          <Stack spacing={2}>
            {filteredCustomers.map((customer) => (
              <Box 
                key={customer.id}
                sx={{ 
                  p: 3, 
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
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                      <Typography 
                        level="body-lg" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: isDarkMode ? '#ffffff' : '#1a202c'
                        }}
                      >
                        {customer.name}
                      </Typography>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={customer.status === 'active' ? 'success' : 'neutral'}
                      >
                        {customer.status}
                      </Chip>
                    </Stack>
                    
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6} md={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <PhoneIcon sx={{ fontSize: 16, color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }} />
                          <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                            {customer.phone}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid xs={12} sm={6} md={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon sx={{ fontSize: 16, color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }} />
                          <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                            {customer.email}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid xs={12} sm={6} md={2}>
                        <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                          <strong>Moves:</strong> {customer.totalMoves}
                        </Typography>
                      </Grid>
                      <Grid xs={12} sm={6} md={2}>
                        <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                          <strong>Spent:</strong> {customer.totalSpent}
                        </Typography>
                      </Grid>
                      <Grid xs={12} sm={6} md={2}>
                        <Typography level="body-sm" sx={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}>
                          <strong>Last:</strong> {customer.lastMove}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  
                  <IconButton
                    size="sm"
                    sx={{
                      color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      }
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Customers;
