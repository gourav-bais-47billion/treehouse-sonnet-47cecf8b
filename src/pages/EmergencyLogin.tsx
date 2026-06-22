import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  CircularProgress,
} from '@mui/material';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setUser, setEmergencyMode } from '../store/authSlice';

const EmergencyLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLocked) {
      setError('Account temporarily locked. Try again in 15 minutes.');
      return;
    }

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/emergency-login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        dispatch(setUser(data.user));
        dispatch(setEmergencyMode(true));
        navigate('/home');
      } else {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);

        if (newFailedAttempts >= 5) {
          setIsLocked(true);
          setError(
            'Account temporarily locked for 15 minutes due to multiple failed attempts.'
          );
        } else {
          setError(
            `Invalid credentials. ${5 - newFailedAttempts} attempts remaining.`
          );
        }
        setPassword('');
      }
    } catch (err) {
      setError('Authentication service unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color-background)',
        padding: 'var(--space-2xl)',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            padding: 'var(--space-2xl)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Back Link */}
          <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={() => navigate('/login')}
            sx={{
              mb: 'var(--space-lg)',
              color: 'var(--color-primary)',
              textTransform: 'none',
            }}
          >
            Back to Login
          </Button>

          {/* Branding */}
          <Box sx={{ mb: 'var(--space-2xl)', textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: 'var(--space-sm)',
              }}
            >
              Treehouse Sonnet
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'var(--color-secondary)' }}
            >
              Emergency Access Mode
            </Typography>
          </Box>

          {/* Warning Banner */}
          <Alert
            severity="warning"
            icon={<AlertTriangle size={20} />}
            sx={{
              mb: 'var(--space-lg)',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              EMERGENCY ACCESS MODE
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
              SSO service is unavailable. Use your emergency credentials below.
              All actions logged.
            </Typography>
          </Alert>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 'var(--space-lg)' }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              placeholder="your.email@allianz.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading || isLocked}
              sx={{ mb: 'var(--space-lg)' }}
              aria-label="Username"
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || isLocked}
              sx={{ mb: 'var(--space-2xl)' }}
              aria-label="Password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading || isLocked}
              sx={{
                height: '40px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#1D4ED8',
                },
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          {/* Help Text */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginTop: 'var(--space-2xl)',
              textAlign: 'center',
              color: 'var(--color-secondary)',
            }}
          >
            Contact: Investment Systems if access not restored
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default EmergencyLogin;
