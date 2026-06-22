import React from 'react';
import { Box, Card, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid } from '@mui/material';
import { Search } from 'lucide-react';

const ReadOnlyUserHome: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Portfolio Analytics
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Self-serve access to portfolio data and hierarchy.
      </Typography>

      <Grid container spacing={3}>
        {/* Total Portfolios Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 'var(--space-lg)' }}>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-md)' }}>
              Total Active Portfolios
            </Typography>
            <Typography variant="h2" sx={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              487
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)' }}>
              across 4 hierarchy levels
            </Typography>
          </Card>
        </Grid>

        {/* Search & Browse */}
        <Grid item xs={12}>
          <Card sx={{ p: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
              Search & Browse Portfolios
            </Typography>
            <TextField
              fullWidth
              placeholder="Search or filter portfolios..."
              InputProps={{
                startAdornment: <Search size={20} style={{ marginRight: 8 }} />,
              }}
              sx={{ mb: 'var(--space-lg)' }}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Portfolio Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Legal Entity</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>pH1</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: 'ACL Fund 24', entity: 'Allianz GmbH', ph1: '1hALAZ' },
                    { name: 'Green Growth 45', entity: 'Allianz SE', ph1: '1hALSE' },
                    { name: 'Legacy 2023', entity: 'Allianz UK', ph1: '1hALUK' },
                  ].map((row, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.entity}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{row.ph1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="text" sx={{ mt: 'var(--space-lg)', color: 'var(--color-primary)' }}>
              View All
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReadOnlyUserHome;
