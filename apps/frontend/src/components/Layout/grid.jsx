import { Box, Card, CardContent } from '@mui/joy';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMemo } from 'react';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

function DataGrid({ 
  columnDefs, 
  rowData, 
  height = 600,
  isDarkMode = true 
}) {
  // AG Grid default column properties
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  // AG Grid grid options
  const gridOptions = useMemo(() => ({
    pagination: true,
    paginationPageSize: 25,
    paginationPageSizeSelector: [10, 20, 25, 50, 100],
    domLayout: 'normal',
    rowSelection: 'single',
    animateRows: true,
    suppressScrollOnNewData: false,
    suppressRowHoverHighlight: false,
    suppressCellFocus: true,
    headerHeight: 64,
    groupHeaderHeight: 64,
    rowHeight: 56,
  }), []);

  return (
    <Card sx={{ 
      backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
      borderColor: isDarkMode ? '#4a5568' : '#e2e8f0',
      border: '1px solid',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      borderRadius: '12px'
    }}>
      <CardContent sx={{ p: 0 }}>
        <Box 
          className="ag-theme-quartz"
          sx={{
            height: height,
            width: '100%',
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.875rem',
            borderRadius: '12px',
            overflow: 'hidden',
            // Target the specific AG Grid pagination select element
            '& .ag-paging-panel select': {
              backgroundColor: '#1a202c !important',
              color: '#ffffff !important',
              border: '1px solid #4a5568 !important',
              fontFamily: '"IBM Plex Sans", sans-serif !important',
              fontSize: '0.875rem !important',
              borderRadius: '4px !important',
              '& option': {
                backgroundColor: '#1a202c !important',
                color: '#ffffff !important',
              },
            },
            '& .ag-root-wrapper': {
              backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              height: '100%',
              border: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`,
              borderRadius: '12px',
            },
            '& .ag-root': {
              height: '100%',
            },
            '& .ag-body-viewport': {
              backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              overflow: 'auto',
            },
            '& .ag-header': {
              backgroundColor: '#000000',
              color: '#ffffff',
              borderBottom: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`,
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
            },
            '& .ag-header-cell': {
              backgroundColor: '#000000',
              color: '#ffffff',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: '#1a1a1a',
              },
            },
            '& .ag-header-cell:last-child': {
              borderRight: 'none',
            },
            '& .ag-header-cell:first-child': {
              borderTopLeftRadius: '12px !important',
            },
            '& .ag-header-cell:last-child': {
              borderTopRightRadius: '12px !important',
            },
            '& .ag-header-cell-text': {
              color: '#ffffff',
              fontWeight: '600',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
            },
            '& .ag-row': {
              backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              borderBottom: `8px solid ${isDarkMode ? 'rgb(0, 0, 0)' : 'rgb(248, 250, 252)'}`,
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              },
            },
            '& .ag-row:last-child': {
              borderBottom: 'none',
            },
            '& .ag-row-selected': {
              backgroundColor: '#3182ce',
              '&:hover': {
                backgroundColor: '#3182ce',
              },
            },
            '& .ag-cell': {
              backgroundColor: 'transparent',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              padding: '0 16px',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              verticalAlign: 'middle',
            },
            '& .ag-cell:last-child': {
              borderRight: 'none',
            },
            '& .ag-paging-panel': {
              backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(255, 255, 255)',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              padding: '20px',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '1rem',
            },
            '& .ag-paging-button': {
              backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
              color: isDarkMode ? '#ffffff' : '#1a202c',
              border: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0',
              },
              '&:disabled': {
                backgroundColor: isDarkMode ? 'rgb(15, 15, 15)' : 'rgb(248, 250, 252)',
                color: isDarkMode ? '#718096' : '#a0aec0',
              },
            },
            '& .ag-paging-page-summary-panel': {
              color: isDarkMode ? '#ffffff' : '#1a202c',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
            },
            '& .ag-filter-toolpanel-header': {
              backgroundColor: '#2d3748',
              color: '#ffffff',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
            },
            '& .ag-filter-toolpanel-group-container': {
              backgroundColor: '#1a202c',
              color: '#ffffff',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.875rem',
            },
            '& .ag-cell-chip': {
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500',
              textTransform: 'capitalize',
              display: 'inline-block',
              fontFamily: '"IBM Plex Sans", sans-serif',
            },
            '& .ag-cell-chip-success': {
              backgroundColor: '#22543d',
              color: '#9ae6b4',
            },
            '& .ag-cell-chip-warning': {
              backgroundColor: '#744210',
              color: '#faf089',
            },
            '& .ag-cell-chip-neutral': {
              backgroundColor: '#4a5568',
              color: '#e2e8f0',
            },
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default DataGrid;
