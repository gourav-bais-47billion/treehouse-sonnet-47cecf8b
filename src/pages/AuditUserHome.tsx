import React from 'react';
import { Box, Card, Typography, Chip, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AuditUserHome: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Audit & Compliance Dashboard
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Access audit logs and compliance evidence.
      </Typography>

      {/* Completeness Status */}
      <Grid container spacing={3} sx={{ mb: 'var(--space-2xl)' }}>
        <Grid item xs={12}>
          <Card sx={{ p: 'var(--space-lg)', backgroundColor: '#DCFCE7' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <CheckCircle size={32} color="#10B981" />
              <Box>
                <Typography variant="h3" sx={{ fontSize: '28px', color: '#10B981' }}>
                  100%
                </Typography>
                <Typography variant="body2">Audit Trail Completeness</Typography>
                <Typography variant="caption" sx={{ color: 'var(--color-secondary)', display: 'block', mt: 'var(--space-sm)' }}>
                  Records this month: 47 | Integrity verified
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Pre-Built Reports */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Pre-Built Compliance Reports
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Report</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Generated</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { name: 'Audit Trail Compliance', generated: 'Jun 11, 15:00' },
                { name: 'Reclassification Summary', generated: 'Jun 11, 14:30' },
                { name: 'Mapping Table Changes', generated: 'Jun 10, 09:00' },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.generated}</TableCell>
                  <TableCell>
                    <Button size="small" variant="text" sx={{ mr: 1 }}>
                      View
                    </Button>
                    <Button size="small" variant="text">
                      Export
                    </Button>
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

export default AuditUserHome;
