import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const QueryAuditTrail: React.FC = () => {
  const [filters, setFilters] = useState({
    portfolioName: '',
    dateFrom: '2026-06-01',
    dateTo: '2026-06-11',
    userId: '',
    actionType: 'all',
  });

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Audit Trail Query
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Search immutable audit logs for compliance and investigation.
      </Typography>

      {/* Filters */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Query Filters
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)', mb: 'var(--space-lg)' }}>
          <TextField
            label="Portfolio Name"
            value={filters.portfolioName}
            onChange={(e) => setFilters({ ...filters, portfolioName: e.target.value })}
          />
          <TextField
            label="From Date"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          />
          <TextField
            label="To Date"
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
          <TextField
            label="User ID (optional)"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
          />
          <Select
            value={filters.actionType}
            onChange={(e) => setFilters({ ...filters, actionType: e.target.value })}
          >
            <MenuItem value="all">All Actions</MenuItem>
            <MenuItem value="reclassify">Reclassify</MenuItem>
            <MenuItem value="mapping_add">Mapping Add</MenuItem>
            <MenuItem value="mapping_edit">Mapping Edit</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            Search
          </Button>
          <Button variant="outlined">Clear Filters</Button>
          <Button variant="outlined">Export Results to CSV</Button>
        </Box>
      </Card>

      {/* Results Table */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Results (23 records)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>Portfolio</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Old Value</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>New Value</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { portfolio: 'ACL Fund 24', action: 'Reclassify', old: '4ALAZG', new: '4ALAZB', user: 'admin', date: '6/10' },
                { portfolio: 'Green Growth', action: 'Mapping Add', old: 'N/A', new: 'N/A', user: 'ted', date: '6/09' },
                { portfolio: 'Legacy 2023', action: 'Reclassify', old: '4ALAZG', new: '4ALAZB', user: 'admin', date: '6/08' },
              ].map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{row.portfolio}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '12px' }}>{row.old}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '12px' }}>{row.new}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default QueryAuditTrail;
