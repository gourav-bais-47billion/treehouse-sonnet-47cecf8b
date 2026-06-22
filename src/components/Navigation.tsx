import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home,
  List as ListAlt,
  LayoutGrid as GridView,
  HelpCircle as HelpOutline,
  ChevronDown,
  Menu as MenuIcon,
  X as CloseIcon,
  RotateCw,
  Edit,
  Search,
  BarChart,
  Shield,
  Users,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import styles from './Navigation.module.css';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    if (!user) return [];

    const commonItems = [
      { label: 'Home', icon: Home, path: '/home' },
      { label: 'Portfolios', icon: ListAlt, path: '/portfolios' },
      { label: 'Mapping Tables', icon: GridView, path: '/mapping-tables' },
      { label: 'Help & Documentation', icon: HelpOutline, path: '/help' },
    ];

    const roleSpecificItems: Record<UserRole, React.ReactNode[]> = {
      'front-office': [
        { label: 'My Requests', icon: Search, path: '/my-requests' },
        { label: 'Portfolio Search', icon: Search, path: '/portfolios-search' },
      ],
      'data-governance-admin': [
        { label: 'Code Generation Queue', icon: RotateCw, path: '/code-gen-queue' },
        { label: 'Reclassify', icon: Edit, path: '/reclassify' },
        { label: 'Audit Trail', icon: AlertCircle, path: '/audit-trail' },
        { label: 'Reports', icon: BarChart, path: '/reports' },
      ],
      'read-only': [],
      'audit': [
        { label: 'Audit Trail', icon: AlertCircle, path: '/audit-trail' },
        { label: 'Reports', icon: BarChart, path: '/reports' },
      ],
      'system-admin': [
        { label: 'User Management', icon: Users, path: '/user-management' },
        { label: 'Audit Log', icon: AlertCircle, path: '/audit-log' },
        { label: 'Settings', icon: Settings, path: '/settings' },
        { label: 'Status Dashboard', icon: BarChart, path: '/status' },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user.role] || [])];
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => location.pathname === path;

  const navigationContent = (
    <Box className={styles.navContainer}>
      <List>
        {menuItems.map((item, index) => {
          const Icon = item.icon as any;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive(item.path)}
                className={styles.listItemButton}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563EB',
                    '& .MuiListItemIcon-root': {
                      color: '#2563EB',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 99 }}
        >
          {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </IconButton>
      )}

      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          {navigationContent}
        </Drawer>
      ) : (
        <Box
          className={styles.sidebar}
          sx={{
            width: 240,
            height: '100vh',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E4E4E7',
            overflowY: 'auto',
            position: 'sticky',
            top: 0,
          }}
        >
          {navigationContent}
        </Box>
      )}
    </>
  );
};

export default Navigation;
