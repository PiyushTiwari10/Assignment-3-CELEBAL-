import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Stack } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150, sortable: true, filterable: true },
  { field: 'role', headerName: 'Role', width: 150, sortable: true, filterable: true },
];

const rows = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'Editor' },
  { id: 3, name: 'Charlie', role: 'Viewer' },
  { id: 4, name: 'David', role: 'Admin' },
  { id: 5, name: 'Eva', role: 'Editor' },
  { id: 6, name: 'Frank', role: 'Viewer' },
];

function CustomToolbar({ value, onChange }) {
  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 1, width: '100%' }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by name..."
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{ width: 250 }}
        />
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );
}

export default function Tables() {
  const [search, setSearch] = useState('');
  const filteredRows = rows.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Tables</Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            components={{ Toolbar: () => <CustomToolbar value={search} onChange={e => setSearch(e.target.value)} /> }}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </Paper>
    </Box>
  );
} 