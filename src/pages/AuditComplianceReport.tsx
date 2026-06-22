import React from 'react';
import { Box, Card, Typography, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Chip } from '@mui/material';
import { CheckCircle, AlertCircle, Download } from 'lucide-react';

const AuditComplianceReport: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Audit Trail Compliance Report
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Quarterly compliance evidence for audit and regulatory review.
      </Typography>

      {/* Period Selector */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-end' }}>
          <Select defaultValue="Q2" sx={{ minWidth: 150 }}>
            <MenuItem value="Q1">Q1 2026</MenuItem>
            <MenuItem value="Q2">Q2 2026</MenuItem>
            <MenuItem value="Q3">Q3 2026</MenuItem>
          </Select>
          <Typography variant="body2" sx={{ color: 'var(--color-secondary)' }}>
            Generated: Jun 11, 2026 at 3:45 PM ET
          </Typography>
        </Box>
      </Card>

      {/* Completeness Banner */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)', backgroundColor: '#DCFCE7' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <CheckCircle size={32} color="#10B981" />
          <Box>
            <Typography variant="h2" sx={{ fontSize: '24px', color: '#10B981' }}>
              ✓ 100% AUDIT TRAIL COMPLETENESS
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              All portfolio hierarchy changes recorded with full old/new codes. Data integrity verified. Compliant with SM5 success metric.
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Summary Metrics */}
      <Grid container spacing={2} sx={{ mb: 'var(--space-2xl)' }}>
        {[
          { label: 'Reclassifications', value: '7' },
          { label: 'Mapping Table Changes', value: '14' },
          { label: 'Deactivations', value: '0' },
          { label: 'Data Governance Admins Active', value: '2' },
        ].map((metric, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: '24px', color: 'var(--color-primary)' }}>
                {metric.value}
              </Typography>
              <Typography variant="caption" sx={{ color: 'var(--color-secondary)' }}>
                {metric.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Reclassifications by User */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Reclassifications by User
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Count</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Portfolios Affected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { user: 'Ted Adams', count: 4, portfolios: 'ACL Fund 24, GreenGrowth45, Legacy2023, ...' },
                { user: 'Admin Account', count: 3, portfolios: 'SafeHarb2023, BlueBook15, ...' },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontWeight: 500 }}>{row.user}</TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell>{row.portfolios}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Data Quality Checks */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Data Quality Checks
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {[
            '100% of reclassification records have complete old/new pH codes',
            'All user IDs present and valid',
            'All timestamps within valid range (Q2 2026)',
            'No orphaned or referential integrity violations',
            'All changes attributed to verified Data Governance users',
          ].map((check, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <CheckCircle size={20} color="#10B981" />
              <Typography variant="body2">{check}</Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Export */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button
            variant="contained"
            startIcon={<Download size={16} />}
            sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            Download PDF
          </Button>
          <Button variant="outlined">Export to CSV</Button>
          <Button variant="outlined">Print</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default AuditComplianceReport;
