import React from 'react';
import { Box, Card, Typography, TextField, Button, Grid, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Copy } from 'lucide-react';

const ViewPortfolioDetail: React.FC = () => {
  const { portfolioId } = useParams();

  const portfolio = {
    name: 'ACL Fund 2024',
    status: 'codes-generated',
    id: portfolioId,
    portfolioName: 'ACL Fund 2024',
    currency: 'USD',
    domicile: 'United States',
    bankAccount: '****5678',
    description: 'Long-term fixed income allocation...',
    legalEntity: 'Allianz GmbH',
    manager: 'Portfolio Managers',
    saa: false,
    assetOwner: 'Global Investment Management',
    bookType: 'Green',
    ph1: '1hALAZ',
    ph2: '1hALAZGR',
    ph3: '3FIX',
    ph4: '4ALAZG',
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 'var(--space-2xl)' }}>
        <Box>
          <Typography variant="h1">{portfolio.name}</Typography>
          <Typography variant="body2" sx={{ color: 'var(--color-secondary)' }}>
            ID: {portfolio.id}
          </Typography>
        </Box>
        <Button variant="contained" sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
          Actions
        </Button>
      </Box>

      {/* Attributes Grid */}
      <Grid container spacing={2} sx={{ mb: 'var(--space-2xl)' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
              Portfolio Identity
            </Typography>
            {['portfolioName', 'currency', 'domicile', 'bankAccount', 'description'].map((key) => (
              <Box key={key} sx={{ mb: 'var(--space-md)' }}>
                <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </Typography>
                <Typography variant="body2">{(portfolio as any)[key] || 'N/A'}</Typography>
              </Box>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
              Hierarchy Attributes
            </Typography>
            {['legalEntity', 'manager', 'saa', 'assetOwner', 'bookType'].map((key) => (
              <Box key={key} sx={{ mb: 'var(--space-md)' }}>
                <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </Typography>
                <Typography variant="body2">{String((portfolio as any)[key]) || 'N/A'}</Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>

      {/* Generated Codes */}
      <Card sx={{ p: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Generated Hierarchy Codes
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>pH Level</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {['ph1', 'ph2', 'ph3', 'ph4'].map((key) => (
              <TableRow key={key}>
                <TableCell>{key.toUpperCase()}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>{(portfolio as any)[key]}</TableCell>
                <TableCell>
                  <Button size="small" startIcon={<Copy size={14} />}>
                    Copy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Reclassification History */}
      <Card sx={{ p: 'var(--space-lg)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Reclassification History (2 changes)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Typography variant="body2">Jun 10, 2026 — Book Type changed Green → Blue (by Ted Adams)</Typography>
          <Typography variant="body2">Jun 08, 2026 — Portfolio created</Typography>
        </Box>
        <Button variant="text" sx={{ mt: 'var(--space-lg)', color: 'var(--color-primary)' }}>
          View Full History
        </Button>
      </Card>
    </Box>
  );
};

export default ViewPortfolioDetail;
