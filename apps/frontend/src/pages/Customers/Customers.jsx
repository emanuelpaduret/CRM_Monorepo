import { Box, Typography } from '@mui/joy';
import { useState, useEffect, useMemo } from 'react';
import DataGrid from '../../components/Layout/grid';
import { submissions } from '../../services/api';

// Format ISO date/time to EST/EDT (America/New_York) as YYYY-MM-DD HH:mm
function formatToEST(isoString) {
  if (!isoString) return 'Not specified';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type) => parts.find(p => p.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`;
}

function Customers({ user }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Fetch customers from database
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await submissions.getAll({
          limit: 1000,
          sort: '-createdAt'
        });
        
        if (response.data.success) {
          const mappedCustomers = response.data.data.submissions.map(submission => ({
            id: submission._id,
            dateOfFirstContact: submission.dateOfFirstContact || 'Not specified',
            name: submission.name || 'Unknown',
            phone: submission.phone || 'N/A',
            email: submission.email || 'N/A',
            source: submission.source || 'Unknown',
            status: submission.status || 'new',
            dateOfMove: submission.movingDetails?.movingDate || 'Not specified',
            address1: submission.movingDetails?.firstAddress || 'Not specified',
            address2: submission.movingDetails?.secondAddress || ''
          }));
          
          setCustomers(mappedCustomers);
        } else {
          setError('Failed to fetch customers');
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError(err.response?.data?.message || 'Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Custom cell renderer for status
  const StatusCellRenderer = (props) => {
    const status = props.value;
    const color = status === 'active' || status === 'completed' ? 'success' : 
                 status === 'in_progress' ? 'warning' : 'neutral';
    
    return (
      <span className={`ag-cell-chip ag-cell-chip-${color}`}>
        {status}
      </span>
    );
  };

  // Column definitions
  const columnDefs = useMemo(() => [
    {
      field: 'dateOfFirstContact',
      headerName: 'Date of First Contact',
      sortable: true,
      filter: true,
      width: 220,
      valueFormatter: (params) => formatToEST(params.value)
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      filter: true,
      width: 200,
      cellStyle: { fontWeight: 'bold' }
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: true,
      filter: true,
      width: 150
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      filter: true,
      width: 250
    },
    {
      field: 'source',
      headerName: 'Source',
      sortable: true,
      filter: true,
      width: 120
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: StatusCellRenderer
    },
    {
      field: 'dateOfMove',
      headerName: 'Date of Move',
      sortable: true,
      filter: true,
      width: 150
    },
    {
      field: 'address1',
      headerName: 'Address 1',
      sortable: true,
      filter: true,
      width: 200
    },
    {
      field: 'address2',
      headerName: 'Address 2',
      sortable: true,
      filter: true,
      width: 150
    }
  ], []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography level="h4">Loading customers...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography level="h4" sx={{ color: '#ef4444', mb: 2 }}>
          Error loading customers
        </Typography>
        <Typography level="body-lg">
          {error}
        </Typography>
      </Box>
    );
  }

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
          All Customers
        </Typography>
        <Typography 
          level="body-lg" 
          sx={{ 
            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
          }}
        >
          View and manage all your customer data and submissions.
        </Typography>
      </Box>
      
      <DataGrid 
        columnDefs={columnDefs} 
        rowData={customers} 
        height={700}
        isDarkMode={isDarkMode}
      />
    </Box>
  );
}

export default Customers;
