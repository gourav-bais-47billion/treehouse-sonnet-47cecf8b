import React from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Chip,
} from '@mui/material';
import { CheckCircle, AlertCircle, Zap, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DataGovernanceAdminHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-md)' }}>
        Dashboard — Data Governance
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-2xl)' }}>
        Active portfolio setup tasks and system status.
      </Typography>

      {/* Metric Cards */}
      <Grid container spacing={2} sx={{ mb: 'var(--space-2xl)' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              3
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              Awaiting Code Gen
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              7
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              This Month Complete
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 'var(--space-lg)', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              9/9
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              Mapping Tables Active
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Code Generation */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Pending Code Generation
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Portfolio</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { id: '1', name: 'GreenFund24', submitted: '2 hrs ago' },
                { id: '2', name: 'Legacy2023', submitted: '4 hrs ago' },
                { id: '3', name: 'AldwichPort05', submitted: '12 hrs' },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontSize: '12px',
                      }}
                    >
                      Generate Codes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* System Status */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          System Status
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {[
            { name: 'Database', status: 'Online', icon: Database },
            { name: 'API Service', status: 'Running', icon: Zap },
            { name: 'Backup Service', status: 'OK', icon: CheckCircle },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <Icon size={20} color="var(--color-success)" />
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
                <Chip label={item.status} color="success" size="small" />
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
};

export default DataGovernanceAdminHome;
