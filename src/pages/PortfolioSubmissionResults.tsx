import React from 'react';
import { Box, Card, Typography, Button, Alert, Grid, TextField } from '@mui/material';
import { CheckCircle, Copy } from 'lucide-react';
import { useParams } from 'react-router-dom';

const PortfolioSubmissionResults: React.FC = () => {
  const { portfolioId } = useParams();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const codes = {
    pH1: '1hALAZ',
    pH2: '1hALAZGR',
    pH3: '3FIX',
    pH4: '4ALAZG',
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <Box>
      <Card sx={{ p: 'var(--space-2xl)', backgroundColor: '#DCFCE7', mb: 'var(--space-2xl)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <CheckCircle size={32} color="#10B981" />
          <Box>
            <Typography variant="h2" sx={{ color: '#10B981' }}>
              ✓ Success! Portfolio Request Submitted
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mt: 'var(--space-sm)' }}>
              Portfolio: ACL Fund 2024 | Reference ID: PR-20260611-001 | Submitted: Jun 11, 2:34 PM ET
            </Typography>
          </Box>
        </Box>
      </Card>

      <Card sx={{ p: 'var(--space-2xl)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Generated Hierarchy Codes
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 'var(--space-lg)' }}>
          Ready for entry into Aladdin Portfolio Toolkit
        </Typography>

        {Object.entries(codes).map(([label, code]) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 'var(--space-md)',
              mb: 'var(--space-md)',
              backgroundColor: '#EFF6FF',
              borderRadius: '6px',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                {label}
              </Typography>
              <TextField
                value={code}
                readOnly
                size="small"
                sx={{ mt: 'var(--space-sm)', fontFamily: 'monospace', backgroundColor: 'white' }}
              />
            </Box>
            <Button
              size="small"
              onClick={() => handleCopyCode(code)}
              startIcon={<Copy size={16} />}
              variant={copiedCode === code ? 'contained' : 'outlined'}
            >
              {copiedCode === code ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
        ))}

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 'var(--space-lg)' }}
          onClick={() => {
            const allCodes = Object.values(codes).join('\n');
            navigator.clipboard.writeText(allCodes);
          }}
        >
          Copy All Codes
        </Button>
      </Card>

      <Card sx={{ p: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Next Steps
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            p: 0,
            '& li': {
              display: 'flex',
              gap: 'var(--space-md)',
              mb: 'var(--space-md)',
              fontSize: '13px',
            },
            '& li::before': {
              content: '"•"',
              fontWeight: 'bold',
            },
          }}
        >
          <li>Data Governance will review your request</li>
          <li>pH codes will be entered into Aladdin Portfolio Toolkit</li>
          <li>You will receive a notification when status changes to "Aladdin Entered"</li>
          <li>Check your request status in "My Requests" dashboard anytime</li>
        </Box>

        <Box sx={{ display: 'flex', gap: 'var(--space-lg)', mt: 'var(--space-2xl)' }}>
          <Button variant="contained" sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            Submit Another Portfolio
          </Button>
          <Button variant="outlined">View My Requests</Button>
          <Button variant="outlined">Home</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default PortfolioSubmissionResults;
