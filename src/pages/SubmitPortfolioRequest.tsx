import React, { useState } from 'react';
import { Box, Card, Stepper, Step, StepLabel, TextField, Button, Select, MenuItem, FormControlLabel, Checkbox, Alert, Typography, Grid } from '@mui/material';

const SubmitPortfolioRequest: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    portfolioName: '',
    currency: '',
    domicile: '',
    description: '',
    legalEntity: '',
    manager: '',
    saa: false,
    assetOwner: '',
    bookType: '',
    bankAccount: '',
  });

  const handleNext = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px' }}>
              Portfolio Identity
            </Typography>
            <TextField
              fullWidth
              label="* Portfolio Name"
              name="portfolioName"
              value={formData.portfolioName}
              onChange={handleInputChange}
              placeholder="e.g., ACL Fund 2024"
            />
            <Select
              fullWidth
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Currency</MenuItem>
              <MenuItem value="USD">USD (United States Dollar)</MenuItem>
              <MenuItem value="EUR">EUR (Euro)</MenuItem>
              <MenuItem value="GBP">GBP (British Pound)</MenuItem>
            </Select>
            <Select
              fullWidth
              name="domicile"
              value={formData.domicile}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Domicile</MenuItem>
              <MenuItem value="US">US (United States)</MenuItem>
              <MenuItem value="DE">DE (Germany)</MenuItem>
              <MenuItem value="UK">UK (United Kingdom)</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Description (optional)"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Portfolio description..."
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px' }}>
              Hierarchy Attributes
            </Typography>
            <Select
              fullWidth
              name="legalEntity"
              value={formData.legalEntity}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Legal Entity</MenuItem>
              <MenuItem value="AL">AL — Allianz GmbH</MenuItem>
              <MenuItem value="AS">AS — Allianz SE</MenuItem>
            </Select>
            <Select
              fullWidth
              name="manager"
              value={formData.manager}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Manager</MenuItem>
              <MenuItem value="PM">Portfolio Managers</MenuItem>
              <MenuItem value="MGT01">Management 01</MenuItem>
            </Select>
            <FormControlLabel
              control={
                <Checkbox
                  name="saa"
                  checked={formData.saa}
                  onChange={handleInputChange}
                />
              }
              label="Strategic Asset Allocation (SAA)"
            />
            <Select
              fullWidth
              name="assetOwner"
              value={formData.assetOwner}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Asset Owner</MenuItem>
              <MenuItem value="GLOBAL">Global Investment Management</MenuItem>
            </Select>
            <Select
              fullWidth
              name="bookType"
              value={formData.bookType}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">Select Book Type</MenuItem>
              <MenuItem value="GREEN">Green</MenuItem>
              <MenuItem value="BLUE">Blue</MenuItem>
            </Select>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px' }}>
              Banking Details
            </Typography>
            <TextField
              fullWidth
              label="* Bank Account Number"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleInputChange}
              placeholder="Account number"
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <Typography variant="h3" sx={{ fontSize: '16px' }}>
              Review
            </Typography>
            <Card sx={{ p: 'var(--space-lg)', backgroundColor: '#EFF6FF' }}>
              <Grid container spacing={2}>
                {Object.entries(formData).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="caption" sx={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </Typography>
                    <Typography variant="body2">{String(value) || 'Not provided'}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Card sx={{ p: 'var(--space-2xl)' }}>
        <Typography variant="h1" sx={{ mb: 'var(--space-2xl)' }}>
          Submit Portfolio Request
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 'var(--space-2xl)' }}>
          <Step>
            <StepLabel>Portfolio Identity</StepLabel>
          </Step>
          <Step>
            <StepLabel>Hierarchy Attributes</StepLabel>
          </Step>
          <Step>
            <StepLabel>Banking Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>

        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'var(--space-2xl)', gap: 'var(--space-lg)' }}>
          <Box>
            <Button onClick={handleBack} disabled={activeStep === 0} sx={{ mr: 1 }}>
              Previous
            </Button>
            <Button variant="outlined">Save as Draft</Button>
          </Box>
          <Box>
            <Button onClick={handleNext} variant="contained" sx={{ mr: 1, backgroundColor: 'var(--color-primary)', color: 'white' }}>
              {activeStep === 3 ? 'Submit' : 'Next'}
            </Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SubmitPortfolioRequest;
