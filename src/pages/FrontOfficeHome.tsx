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
  Chip,
  Grid,
} from '@mui/material';
import { Plus, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';

const FrontOfficeHome: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // Mock data
  const recentRequests = [
    {
      id: '1',
      name: 'ACL Fund 2024',
      status: 'codes-generated',
      date: 'Jun 11',
    },
    {
      id: '2',
      name: 'Green Growth 45',
      status: 'submitted',
      date: 'Jun 10',
    },
    {
      id: '3',
      name: 'Legacy 2023',
      status: 'codes-generated',
      date: 'Jun 08',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'codes-generated':
        return 'success';
      case 'submitted':
        return 'info';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'codes-generated':
        return 'Generated';
      case 'submitted':
        return 'Submitted';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  return (
    <Box>
      {/* Page Title */}
      <Box sx={{ mb: 'var(--space-2xl)' }}>
        <Typography variant="h1">Welcome, {user?.name?.split(' ')[0]}!</Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
          You can submit new portfolio requests and track their progress through our data
          governance system.
        </Typography>
      </Box>

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* New Request Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 'var(--space-lg)',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              '&:hover': {
                boxShadow: 'var(--shadow-lg)',
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => navigate('/submit-portfolio')}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  p: 'var(--space-md)',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={24} color="#2563EB" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-sm)' }}>
                  New Portfolio Request
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-secondary)' }}>
                  Start a new portfolio setup
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 'var(--space-lg)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              Submit New Request
            </Button>
          </Card>
        </Grid>

        {/* Recent Requests Card */}
        <Grid item xs={12}>
          <Card sx={{ p: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
              Your Recent Requests (Last 5)
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Portfolio Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentRequests.map((request) => (
                    <TableRow
                      key={request.id}
                      hover
                      onClick={() => navigate(`/portfolio/${request.id}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{request.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(request.status)}
                          color={getStatusColor(request.status)}
                          size="small"
                          icon={
                            request.status === 'codes-generated' ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Clock size={14} />
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{request.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="text"
              endIcon={<ChevronRight size={16} />}
              onClick={() => navigate('/my-requests')}
              sx={{ mt: 'var(--space-lg)', color: 'var(--color-primary)' }}
            >
              View All Requests
            </Button>
          </Card>
        </Grid>

        {/* Key Features Card */}
        <Grid item xs={12}>
          <Card sx={{ p: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
              Key Features
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                '& li': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  mb: 'var(--space-md)',
                  fontSize: '13px',
                },
                '& li::before': {
                  content: '"✓"',
                  color: 'var(--color-success)',
                  fontWeight: 'bold',
                  fontSize: '18px',
                },
              }}
            >
              <li>Submit portfolio requests</li>
              <li>Track hierarchy code generation</li>
              <li>View portfolio details</li>
              <li>Search active portfolios</li>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FrontOfficeHome;
