import React, { useState } from 'react';
import { Box, Card, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Pagination } from '@mui/material';
import { Search } from 'lucide-react';
import { Typography } from '@mui/material';

const SearchAndListPortfolios: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const portfolios = [
    { id: '1', name: 'ACL Fund 2024', entity: 'Allianz GmbH', manager: 'PM Team', ph1: '1hA', status: 'Active', modified: 'Jun 10' },
    { id: '2', name: 'Green Growth', entity: 'Allianz SE', manager: 'PM Team', ph1: '1hA', status: 'Active', modified: 'Jun 08' },
    { id: '3', name: 'Legacy 2023', entity: 'Allianz UK', manager: 'Mgmt01', ph1: '1hU', status: 'Active', modified: 'May 30' },
  ];

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Portfolios
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Search and browse all active portfolios in Treehouse.
      </Typography>

      {/* Filters */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h4" sx={{ mb: 'var(--space-lg)' }}>
          Search & Filters
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)', mb: 'var(--space-lg)' }}>
          <TextField
            placeholder="Search portfolio name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <Search size={18} style={{ marginRight: 8 }} /> }}
          />
          <Select displayEmpty defaultValue="">
            <MenuItem value="">All Legal Entities</MenuItem>
            <MenuItem value="AL">Allianz GmbH</MenuItem>
            <MenuItem value="AS">Allianz SE</MenuItem>
          </Select>
          <Select displayEmpty defaultValue="">
            <MenuItem value="">All Managers</MenuItem>
            <MenuItem value="PM">Portfolio Managers</MenuItem>
          </Select>
          <Select displayEmpty defaultValue="">
            <MenuItem value="">All Book Types</MenuItem>
            <MenuItem value="GREEN">Green</MenuItem>
            <MenuItem value="BLUE">Blue</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', gap: 'var(--space-md)' }}>
          <Button variant="outlined">Clear Filters</Button>
          <Button variant="contained" sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            Advanced
          </Button>
        </Box>
      </Card>

      {/* Results Table */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h4" sx={{ mb: 'var(--space-lg)' }}>
          Results ({portfolios.length} portfolios)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>Portfolio Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Legal Entity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Manager</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>pH1</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Modified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolios.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell>{row.entity}</TableCell>
                  <TableCell>{row.manager}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{row.ph1}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color="success" size="small" />
                  </TableCell>
                  <TableCell>{row.modified}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'var(--space-lg)' }}>
          <Pagination count={3} page={page} onChange={(_, value) => setPage(value)} />
          <Button variant="outlined">Export to CSV</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SearchAndListPortfolios;
