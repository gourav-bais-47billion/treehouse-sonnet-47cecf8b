import React, { useState } from 'react';
import { Box, Card, Typography, Select, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Search } from 'lucide-react';

const ViewMappingTables: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('legal-entity');
  const [searchTerm, setSearchTerm] = useState('');

  const tables: Record<string, Array<{ code: string; description: string; active: boolean }>> = {
    'legal-entity': [
      { code: 'AL', description: 'Allianz GmbH', active: true },
      { code: 'AS', description: 'Allianz SE', active: true },
      { code: 'AU', description: 'Allianz UK', active: true },
    ],
    'manager': [
      { code: 'PM', description: 'Portfolio Managers', active: true },
      { code: 'MGT01', description: 'Management 01', active: true },
    ],
  };

  const entries = tables[selectedTable] || [];

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Mapping Tables
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Reference codes for portfolio hierarchy attributes.
      </Typography>

      {/* Controls */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', mb: 'var(--space-lg)' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Table:
          </Typography>
          <Select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="legal-entity">Legal Entity</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="saa">SAA</MenuItem>
            <MenuItem value="asset-owner">Asset Owner</MenuItem>
            <MenuItem value="book-type">Book Type</MenuItem>
          </Select>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            sx={{ ml: 'auto', backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            Add Record
          </Button>
          <Button variant="outlined">Upload CSV</Button>
          <Button variant="outlined">Export CSV</Button>
        </Box>
      </Card>

      {/* Table */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          {selectedTable.replace(/-/g, ' ').toUpperCase()} ({entries.length} codes)
        </Typography>

        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 'var(--space-lg)' }}
          InputProps={{ startAdornment: <Search size={18} style={{ marginRight: 8 }} /> }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Active</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((row) => (
                <TableRow key={row.code} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{row.code}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.active ? '✓' : '✗'}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <Edit size={16} />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Trash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ViewMappingTables;
