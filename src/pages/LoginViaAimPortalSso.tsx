import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import { AlertCircle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setUser } from '../store/authSlice';

const LoginViaAimPortalSso: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Check if returning from SSO
    const checkAuthStatus = async () => {
      const token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        setIsRedirecting(true);
        localStorage.setItem('authToken', token);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.data));
            navigate('/home');
          } else {
            setError('Authentication failed. Please try again.');
            setIsRedirecting(false);
          }
        } catch (err) {
          setError('Session verification failed. Please try again.');
          setIsRedirecting(false);
        }
      }
    };

    checkAuthStatus();
  }, [dispatch, navigate]);

  const handleSSOLogin = async () => {
    setIsLoading(true);
    setError(null);

    // PREVIEW MOCK: no SSO/backend is running — log in as a mock
    // system-admin and go straight to /home.
    dispatch(
      setUser({
        id: 'mock-user-1',
        email: 'preview.user@treehouse.local',
        name: 'Preview Admin',
        role: 'system-admin',
        groups: ['system-admin'],
      })
    );
    setIsLoading(false);
    navigate('/home');
  };

  const handleEmergencyLogin = () => {
    navigate('/emergency-login');
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
            textAlign: 'center',
          }}
        >
          {/* Branding */}
          <Box sx={{ mb: 'var(--space-2xl)' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'var(--color-primary)',
                borderRadius: '8px',
                margin: '0 auto var(--space-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LogIn size={24} color="white" />
            </Box>
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
              Portfolio Hierarchy Management
            </Typography>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert
              severity="error"
              icon={<AlertCircle size={20} />}
              sx={{ mb: 'var(--space-lg)' }}
            >
              {error}
            </Alert>
          )}

          {/* Redirecting State */}
          {isRedirecting && (
            <Box sx={{ textAlign: 'center', py: 'var(--space-2xl)' }}>
              <CircularProgress sx={{ mb: 'var(--space-lg)' }} />
              <Typography
                variant="body2"
                sx={{ color: 'var(--color-secondary)' }}
              >
                Redirecting to Entra ID...
              </Typography>
            </Box>
          )}

          {/* Main Content */}
          {!isRedirecting && (
            <>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: 'var(--space-md)',
                }}
              >
                Sign in with AIM Portal
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'var(--color-secondary)',
                  marginBottom: 'var(--space-2xl)',
                }}
              >
                Your credentials are managed by your organisation's identity
                provider
              </Typography>

              {/* Loading Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleSSOLogin}
                disabled={isLoading}
                sx={{
                  mb: 'var(--space-lg)',
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
                    Redirecting to Entra ID...
                  </>
                ) : (
                  'Sign In with AIM Portal'
                )}
              </Button>

              {/* Emergency Login Link */}
              {import.meta.env.VITE_ENABLE_EMERGENCY_LOGIN !== 'false' && (
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleEmergencyLogin}
                    sx={{
                      color: 'var(--color-secondary)',
                      textTransform: 'none',
                      '&:hover': {
                        color: 'var(--color-primary)',
                      },
                    }}
                  >
                    Emergency Login
                  </Button>
                </Typography>
              )}
            </>
          )}

          {/* Footer */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginTop: 'var(--space-2xl)',
              color: 'var(--color-secondary)',
            }}
          >
            Version: 1.0 | © 47 Billion 2026
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginViaAimPortalSso;
