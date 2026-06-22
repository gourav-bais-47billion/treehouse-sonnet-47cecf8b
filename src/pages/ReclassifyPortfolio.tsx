import React, { useState } from 'react';
import { Box, Card, Typography, Select, MenuItem, TextField, Button, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const ReclassifyPortfolio: React.FC = () => {
  const { portfolioId } = useParams();
  const [bookType, setBookType] = useState('Green');
  const [effectiveDate, setEffectiveDate] = useState('06/11/2026');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 'var(--space-2xl)' }}>
        Reclassify Portfolio: ACL Fund 2024
      </Typography>

      <Card sx={{ p: 'var(--space-2xl)', mb: 'var(--space-2xl)' }}>
        <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
          Current Attributes
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)', mb: 'var(--space-2xl)' }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
              Legal Entity
            </Typography>
            <Typography variant="body2">Allianz GmbH</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
              Manager
            </Typography>
            <Typography variant="body2">Portfolio Managers</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
              Book Type
            </Typography>
            <Select
              value={bookType}
              onChange={(e) => setBookType(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="Green">Green</MenuItem>
              <MenuItem value="Blue">Blue</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box sx={{ mb: 'var(--space-2xl)' }}>
          <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
            * Effective Date
          </Typography>
          <TextField
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            fullWidth
            size="small"
            inputProps={{ defaultValue: effectiveDate }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            onClick={() => setShowPreview(true)}
          >
            Preview New Codes
          </Button>
          <Button variant="outlined">Reset</Button>
        </Box>
      </Card>

      {showPreview && (
        <Card sx={{ p: 'var(--space-2xl)', mb: 'var(--space-2xl)', backgroundColor: '#DCFCE7' }}>
          <Typography variant="h3" sx={{ fontSize: '16px', mb: 'var(--space-lg)' }}>
            New pH Codes (Preview)
          </Typography>
          {[
            { label: 'pH1', old: '1hALAZ', new: '1hALAZ', changed: false },
            { label: 'pH2', old: '1hALAZGR', new: '1hALAZBR', changed: true },
            { label: 'pH3', old: '3FIX', new: '3FIX', changed: false },
            { label: 'pH4', old: '4ALAZG', new: '4ALAZB', changed: true },
          ].map((row, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', mb: 'var(--space-md)', p: 'var(--space-md)', backgroundColor: row.changed ? 'rgba(16, 185, 129, 0.1)' : 'transparent', borderRadius: '6px' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                {row.label}:
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'var(--color-destructive)' }}>
                {row.old}
              </Typography>
              <Typography variant="body2">→</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--color-success)' }}>
                {row.new}
              </Typography>
              <Typography variant="caption" sx={{ marginLeft: 'auto', color: 'var(--color-secondary)' }}>
                {row.changed ? '(Updated)' : '(No change)'}
              </Typography>
            </Box>
          ))}
        </Card>
      )}

      <Card sx={{ p: 'var(--space-2xl)' }}>
        <Box sx={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            disabled={!showPreview}
          >
            Confirm Reclassification
          </Button>
          <Button variant="outlined">Cancel</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ReclassifyPortfolio;
