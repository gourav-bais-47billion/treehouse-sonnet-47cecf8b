import { createTheme } from '@mui/material/styles';

export const treehouseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#71717A',
      light: '#A1A1AA',
      dark: '#52525B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#FBBF24',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#991B1B',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#1D4ED8',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#09090B',
      secondary: '#71717A',
      disabled: 'rgba(9, 9, 11, 0.38)',
    },
    divider: '#E4E4E7',
    action: {
      hover: 'rgba(37, 99, 235, 0.08)',
      hoverOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focusOpacity: 0.05,
      activeOpacity: 0.12,
      selectedOpacity: 0.08,
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
    h1: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '14px',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '12px',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: '12px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: 0,
    },
    overline: {
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 16px',
          borderRadius: '6px',
          transition: 'all 200ms ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            outline: '2px solid #2563EB',
            outlineOffset: '2px',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E4E4E7',
          transition: 'all 200ms ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#E4E4E7',
          fontSize: '13px',
          padding: '12px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#FAFAFA',
          color: '#09090B',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            '&:hover fieldset': {
              borderColor: '#2563EB',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default treehouseTheme;
