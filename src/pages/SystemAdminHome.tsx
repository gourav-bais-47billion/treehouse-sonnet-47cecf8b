import React from 'react';
import { Box, Card, Typography, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CheckCircle, AlertCircle, Wifi } from 'lucide-react';

const SystemAdminHome: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        System Administration Dashboard
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        System monitoring, health checks, security alerts.
      </Typography>

      {/* Metric Cards */}
      <Grid container spacing={2} sx={{ mb: 'var(--space-2xl)' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              42
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              Total Users Active
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              8
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              Active Sessions
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '20px', color: 'var(--color-success)' }}>
              ✓ 2 hrs ago
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              Last Backup
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* System Status */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          System Status
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { name: 'Database', status: 'Online', time: '2 min ago' },
                { name: 'API Service', status: 'Running', time: '1 min ago' },
                { name: 'Backup Service', status: 'OK', time: '5 min ago' },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color="success"
                      size="small"
                      icon={<CheckCircle size={14} />}
                    />
                  </TableCell>
                  <TableCell>{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Security Events */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Recent Security Events (Last 7 Days)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Event</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { event: 'Failed Login (5x)', user: 'Unknown', time: 'Jun 11, 14:32' },
                { event: 'Account Locked', user: 'j.smith@', time: 'Jun 10, 09:15' },
                { event: 'Access Granted', user: 'm.jones@', time: 'Jun 09, 11:00' },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.event}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default SystemAdminHome;
