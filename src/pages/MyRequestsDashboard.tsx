import React, { useState } from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, FormControlLabel, Checkbox } from '@mui/material';

const MyRequestsDashboard: React.FC = () => {
  const [filters, setFilters] = useState({ all: true });

  const requests = [
    { id: '1', name: 'ACL Fund 2024', status: 'codes-generated', submitted: 'Jun 11', codes: ['1hALAZ', '1hALAZGR'] },
    { id: '2', name: 'Green Growth', status: 'submitted', submitted: 'Jun 10', codes: null },
    { id: '3', name: 'Legacy 2023', status: 'codes-generated', submitted: 'Jun 08', codes: ['1hALUK', '1hALUKGR'] },
  ];

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        My Portfolio Requests
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Track your portfolio requests through the setup process.
      </Typography>

      {/* Status Filters */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h4" sx={{ mb: 'var(--space-md)' }}>
          Filters:
        </Typography>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {['All', 'Draft', 'Submitted', 'Codes Generated', 'Aladdin Entered'].map((filter) => (
            <FormControlLabel
              key={filter}
              control={<Checkbox defaultChecked={filter === 'All'} />}
              label={filter}
            />
          ))}
        </Box>
      </Card>

      {/* Results Table */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h4" sx={{ mb: 'var(--space-lg)' }}>
          Results ({requests.length} requests)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>Portfolio Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Generated Codes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{request.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={request.status === 'codes-generated' ? 'Generated' : 'Submitted'}
                      color={request.status === 'codes-generated' ? 'success' : 'info'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{request.submitted}</TableCell>
                  <TableCell>
                    {request.codes ? (
                      request.codes.map((code) => (
                        <Button
                          key={code}
                          size="small"
                          variant="text"
                          sx={{ fontSize: '11px', mr: 1, fontFamily: 'monospace' }}
                        >
                          {code}
                        </Button>
                      ))
                    ) : (
                      <Typography variant="caption">Pending</Typography>
                    )}
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

export default MyRequestsDashboard;
