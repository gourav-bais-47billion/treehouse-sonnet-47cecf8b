import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import {
  HelpCircle,
  LogOut,
  User,
  AlertCircle,
  MoreVertical,
  ChevronRight,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { User as UserType } from '../types';
import styles from './Shell.module.css';

interface ShellProps {
  user: UserType | null;
  onLogout: () => void;
  isEmergencyMode?: boolean;
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({
  user,
  onLogout,
  isEmergencyMode = false,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  // Generate breadcrumbs from current path
  const getBreadcrumbs = () => {
    const pathParts = location.pathname.split('/').filter((p) => p);
    return pathParts.map((part) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      path: '/' + pathParts.slice(0, pathParts.indexOf(part) + 1).join('/'),
    }));
  };

  const breadcrumbs = getBreadcrumbs();

  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      'front-office': 'Submit Request',
      'data-governance-admin': 'Admin',
      'read-only': 'Analyst',
      audit: 'Audit',
      'system-admin': 'System Admin',
    };
    return roleMap[role] || role;
  };

  return (
    <Box className={styles.shell}>
      {/* Emergency Mode Banner */}
      {isEmergencyMode && (
        <Box
          className={styles.emergencyBanner}
          sx={{
            backgroundColor: '#FEF3C7',
            borderBottom: '2px solid #FBBF24',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <AlertCircle size={16} color="#D97706" />
          <Typography variant="body2" sx={{ color: '#92400E' }}>
            Emergency Access Mode Active - All Actions Logged
          </Typography>
        </Box>
      )}

      {/* Main Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E4E4E7',
          color: '#09090B',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          {/* Left: Branding & Breadcrumbs */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/home')}
            >
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Treehouse
              </Typography>
            </Box>

            {!isMobile && breadcrumbs.length > 0 && (
              <Breadcrumbs
                separator={<ChevronRight size={16} />}
                sx={{ ml: 2 }}
              >
                {breadcrumbs.map((crumb, index) => (
                  <MuiLink
                    key={index}
                    onClick={() => navigate(crumb.path)}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '13px',
                      color:
                        index === breadcrumbs.length - 1
                          ? '#09090B'
                          : '#71717A',
                      '&:hover': { color: '#2563EB' },
                    }}
                  >
                    {crumb.label}
                  </MuiLink>
                ))}
              </Breadcrumbs>
            )}
          </Box>

          {/* Right: Help, User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Help & Documentation">
              <IconButton
                size="small"
                onClick={() => navigate('/help')}
                sx={{
                  color: '#71717A',
                  '&:hover': { color: '#2563EB' },
                }}
              >
                <HelpCircle size={20} />
              </IconButton>
            </Tooltip>

            {/* User Profile Menu */}
            {user && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ textAlign: 'right', mr: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user.name}
                    </Typography>
                    <Chip
                      label={getRoleDisplay(user.role)}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '11px',
                        height: 20,
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </Box>
                  <IconButton
                    onClick={handleMenuOpen}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563EB',
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                      },
                    }}
                  >
                    <User size={18} />
                  </IconButton>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate('/profile');
                    }}
                  >
                    <User size={16} style={{ marginRight: 8 }} />
                    View Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: 8 }} />
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Navigation */}
        {user && <Navigation user={user} onLogout={onLogout} />}

        {/* Content Area */}
        <Box
          className={styles.mainContent}
          sx={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#FAFAFA',
            minHeight: `calc(100vh - 64px${isEmergencyMode ? ' - 40px' : ''})`,
          }}
        >
          <Box
            sx={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: { xs: '16px', sm: '32px' },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Shell;
