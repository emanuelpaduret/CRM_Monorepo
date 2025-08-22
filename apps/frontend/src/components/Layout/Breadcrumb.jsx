import { Box, Typography, IconButton, Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';

function Breadcrumb({ items = [], currentPage, isDarkMode }) {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
                 {/* Home breadcrumb - always present */}
         <Box
           onClick={() => handleBreadcrumbClick('/home')}
           sx={{
             display: 'flex',
             alignItems: 'center',
             gap: 0.5,
             cursor: 'pointer',
             p: 0.3,
             borderRadius: 5,
             transition: 'all 0.2s ease',
             '&:hover': {
               backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
             },
           }}
         >
          <HomeIcon 
            sx={{ 
              fontSize: 14, 
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' 
            }} 
          />
        </Box>

                 {/* Dynamic breadcrumb items */}
         {items.map((item, index) => (
           <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
             <ChevronRightIcon 
               sx={{ 
                 fontSize: 14, 
                 color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                 mx: 0.3
               }} 
             />
                         <Typography
               onClick={() => handleBreadcrumbClick(item.path)}
               level="body-sm"
               sx={{
                 color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                 cursor: item.path ? 'pointer' : 'default',
                 p: 0.3,
                 borderRadius: 5,
                 fontSize: '12px',
                 transition: 'all 0.2s ease',
                 '&:hover': item.path ? {
                   backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                   color: isDarkMode ? '#ffffff' : '#1a202c',
                 } : {},
               }}
             >
              {item.label}
            </Typography>
          </Box>
        ))}

                 {/* Current page - highlighted */}
         {currentPage && (
           <Box sx={{ display: 'flex', alignItems: 'center' }}>
             <ChevronRightIcon 
               sx={{ 
                 fontSize: 14, 
                 color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                 mx: 0.3
               }} 
             />
                         <Typography
               level="body-sm"
               sx={{
                 color: '#3b82f6',
                 fontWeight: 600,
                 p: 0.3,
                 borderRadius: 5,
                 fontSize: '12px',
               }}
             >
              {currentPage}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default Breadcrumb;
