import React from 'react';
import { Box, Card, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { Download } from 'lucide-react';

const PortfolioSetupTimeReport: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Portfolio Setup Time Report
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Measure portfolio request processing time performance.
      </Typography>

      {/* Date Range */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-end' }}>
          <TextField label="From Date" type="date" defaultValue="2026-06-01" />
          <TextField label="To Date" type="date" defaultValue="2026-06-11" />
          <Button variant="contained" sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            Refresh
          </Button>
        </Box>
      </Card>

      {/* Metric Cards */}
      <Grid container spacing={2} sx={{ mb: 'var(--space-2xl)' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '28px', color: 'var(--color-primary)' }}>
              87 min
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)' }}>
              Average Setup Time
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'var(--color-success)', fontWeight: 600, mt: 'var(--space-sm)' }}>
              ✓ Below 90-min target!
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '28px' }}>
              12 min
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)' }}>
              Min. Setup Time
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 'var(--space-sm)' }}>
              (GreenGrowth45)
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '28px' }}>
              2h 15m
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)' }}>
              Max. Setup Time
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 'var(--space-sm)' }}>
              (LegacyFund03)
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Comparison */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Setup Time Comparison (Monthly)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Avg Setup Time</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Change</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Portfolios</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { month: 'May 2026', avg: '105 minutes', change: '—', portfolios: 18, notes: 'Baseline' },
                { month: 'Jun 2026', avg: '87 minutes', change: '↓ -17%', portfolios: 14, notes: 'On track!' },
                { month: '(YTD Avg)', avg: '96 minutes', change: '↓ -9%', portfolios: 32, notes: 'Good progress' },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontWeight: 500 }}>{row.month}</TableCell>
                  <TableCell>{row.avg}</TableCell>
                  <TableCell sx={{ color: row.change.includes('↓') ? 'var(--color-success)' : 'var(--color-secondary)' }}>
                    {row.change}
                  </TableCell>
                  <TableCell>{row.portfolios}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Export */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button
            variant="contained"
            startIcon={<Download size={16} />}
            sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            Download Report
          </Button>
          <Button variant="outlined">Export to CSV</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default PortfolioSetupTimeReport;
