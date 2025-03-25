import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  AppBar,
  Toolbar,
  FormControlLabel,
  Switch,
  CircularProgress,
  LinearProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade,
  Divider,
  InputAdornment,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  alpha,
  useMediaQuery,
  Alert,
  AlertTitle,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import GridViewIcon from '@mui/icons-material/GridView';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import testData from './data.json';

// components
import StudentCard from './components/StudentCard';
import InfoCard from './components/InfoCard';
import CandidacyCard from './components/CandidacyCard';
import Login from './pages/Login';
import Progress from './components/Progress';
import Overview from './components/OverView';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#0f3460',
      light: '#2c5282',
      dark: '#0c2348',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4a5568',
      light: '#718096',
      dark: '#2d3748',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    error: {
      main: '#c53030',
      light: '#e53e3e',
      dark: '#9b2c2c',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed8936',
      light: '#f6ad55',
      dark: '#c05621',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2b6cb0',
      light: '#4299e1',
      dark: '#2c5282',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
      disabled: '#a0aec0',
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          backgroundColor: '#f8fafc',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f5f9',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#a1a1a1',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '@media (max-width:600px)': {
            fontSize: '0.875rem',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1e40af',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1e40af',
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: '#e5e7eb',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: '#eff6ff',
            color: '#1e40af',
            '&:hover': {
              backgroundColor: '#dbeafe',
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          height: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const drawerWidth = 240;

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCard, setActiveCard] = useState('all');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [hasSearched, setHasSearched] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(!isTablet);
  const [multipleResults, setMultipleResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 5;
  const [activeView, setActiveView] = useState('search');
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setError('Please enter an ID number or name');
      return;
    }

    setLoading(true);
    setError('');
    setNoResults(false);
    setMultipleResults(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use test data instead of API call
      const response = testData;

      setHasSearched(true);
      
      if (response.data) {
        // Check if the search query matches the ID in the test data
        if (searchQuery === response.data.info.id_num.toString()) {
          setSearchResults(response.data);
        } else {
          setNoResults(true);
          setSearchResults(null);
        }
      } else {
        setError('Error fetching data');
      }
    } catch (err) {
      console.error('Error searching:', err);
      setError('Error processing the search');
      setHasSearched(true);
      setNoResults(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (event, newCard) => {
    if (newCard !== null) {
      setActiveCard(newCard);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    handleSearch();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Sidebar content
  const sidebarContent = (
    <Box sx={{ width: drawerWidth, pt: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        px: 2
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box 
            sx={{ 
              bgcolor: 'rgba(219, 234, 254, 0.4)', 
              p: 1, 
              borderRadius: '8px',
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(37, 99, 235, 0.1)'
            }}
          >
            <img 
              src="/logo-AUI-02.png" 
              alt="AUI University Logo" 
              style={{ 
                height: '40px', 
                objectFit: 'contain',
              }} 
            />
          </Box>
          <Typography 
            variant="subtitle1" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: '#00712D',
              textAlign: 'center',
              fontSize: '1rem'
            }}
          >
            AUI Student Information
          </Typography>
        </Box>
        
        {!isTablet && (
          <IconButton 
            onClick={toggleDrawer}
            sx={{ 
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
              p: 0.75,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
              color: theme.palette.primary.main
            }}
            size="small"
            title="Close sidebar"
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      
      <Divider sx={{ mb: 1.5 }} />
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Typography 
          variant="overline" 
          sx={{ 
            px: 3, 
            color: 'text.secondary',
            fontWeight: 600,
            display: 'block',
            mb: 0.5,
            fontSize: '0.75rem'
          }}
        >
          DASHBOARD
        </Typography>
        
        <List sx={{ px: 1 }} dense>
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeView === 'search'}
              onClick={() => setActiveView('search')}
              sx={{ 
                borderRadius: '8px',
                mb: 0.5,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <DashboardIcon color={activeView === 'search' ? "primary" : "inherit"} fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Student Search" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: activeView === 'search' ? 600 : 500
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeView === 'progress'}
              onClick={() => setActiveView('progress')}
              sx={{ 
                borderRadius: '8px',
                mb: 0.5,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <InfoOutlinedIcon color={activeView === 'progress' ? "primary" : "inherit"} fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Progress Analysis" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: activeView === 'progress' ? 600 : 500
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => navigate('/overview')}
              sx={{ 
                borderRadius: '8px',
                mb: 0.5,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <GridViewIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Student Overview" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: 500
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Typography 
          variant="overline" 
          sx={{ 
            px: 3, 
            color: 'text.secondary',
            fontWeight: 600,
            display: 'block',
            mb: 0.5,
            fontSize: '0.75rem'
          }}
        >
          CURRENT VIEW
        </Typography>
        
        <List sx={{ px: 1 }} dense>
          {/* ... existing list items ... */}
        </List>
      </Box>
      
      <Divider sx={{ my: 1.5 }} />
      
      <List sx={{ px: 1 }} dense>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout}
            sx={{ 
              borderRadius: '8px',
              py: 1,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.08),
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon color="error" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ 
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'inherit'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(239, 246, 255, 0.3) 0%, rgba(248, 250, 252, 1) 100%)',
      }}>
        {/* Sidebar for desktop */}
        <Drawer
          variant={isTablet ? "temporary" : drawerOpen ? "permanent" : "temporary"}
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              boxShadow: 'none',
              height: '100%',
              position: 'relative',
              borderRight: 'none',
              borderRadius: 0,
            },
          }}
        >
          {sidebarContent}
        </Drawer>
        
        {/* Main content */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          ml: 0,
          minHeight: '100vh',
          borderLeft: drawerOpen ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            flexGrow: 1,
          }}>
            <Box sx={{ 
              flexGrow: 1, 
              pt: 3,
              pb: 2.5, 
              px: {
                xs: 2,
                sm: 3,
                md: !drawerOpen ? 4 : 3,
                lg: !drawerOpen ? 6 : 3,
              },
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f8fafc',
              width: '100%',
              alignItems: 'center',
            }}>
              {/* Content wrapper to maintain max-width */}
              <Box sx={{ 
                width: '100%',
                maxWidth: {
                  xs: '100%',
                  sm: '100%',
                  md: !drawerOpen ? '1200px' : 'none',
                  lg: !drawerOpen ? '1400px' : 'none',
                },
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              }}>
                {/* Title area with logout button */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2.5,
                  width: '100%',
                  justifyContent: 'space-between', 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {(!drawerOpen || isTablet) && (
                      <IconButton 
                        color="inherit" 
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ 
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        <MenuIcon />
                      </IconButton>
                    )}

                    {/* Logo in header when sidebar is hidden */}
                    {!drawerOpen && (
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: 'rgba(15, 52, 96, 0.1)', 
                          p: 0.8, 
                          borderRadius: '8px',
                          boxShadow: '0 2px 5px rgba(15, 52, 96, 0.1)',
                        }}
                      >
                        <img 
                          src="/logo-AUI-02.png" 
                          alt="AUI University Logo" 
                          style={{ 
                            height: '35px', 
                            objectFit: 'contain',
                          }} 
                        />
                      </Box>
                    )}
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#00712D',
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                          fontSize: '1.25rem'
                        }}
                      >
                        {activeView === 'search' ? 'Student Information System' : 'Record Completion Analysis'}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: '#4a5568',
                          display: { xs: 'none', sm: 'block' },
                          fontSize: '0.9rem',
                          fontWeight: 400,
                        }}
                      >
                        {activeView === 'search' ? 'Search student records efficiently' : 'View missing information and completion status'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                      borderColor: '#c53030',
                      color: '#c53030',
                      '&:hover': {
                        backgroundColor: 'rgba(197, 48, 48, 0.08)',
                        borderColor: '#9b2c2c',
                      },
                      px: 2,
                      py: 0.75,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      ml: 2,
                    }}
                  >
                    Logout
                  </Button>
                </Box>

                {/* Conditional rendering based on active view */}
                {activeView === 'search' ? (
                  <>
                    {/* Search bar */}
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: { xs: 2, sm: 2.5 }, 
                        mb: 2.5, 
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px',
                        width: '100%',
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: { xs: 1.5, sm: 1.5 },
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: 'center', 
                          gap: 1.5,
                        }}>
                          <TextField
                            label="Search by ID or Name"
                            placeholder="Enter ID number or full name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            error={!!error}
                            helperText={error}
                            sx={{ 
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#ffffff',
                                borderRadius: '6px',
                                height: '42px',
                                '&.Mui-focused': {
                                  borderColor: '#1e40af',
                                }
                              },
                              '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                  color: '#1e40af',
                                }
                              },
                              width: { xs: '100%', sm: '280px' },
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon sx={{ color: '#1e40af', fontSize: 'medium' }} />
                                </InputAdornment>
                              ),
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSearch();
                              }
                            }}
                          />

                          <Button 
                            variant="contained" 
                            color="primary" 
                            size="medium"
                            onClick={handleSearch}
                            disabled={loading}
                            sx={{ 
                              py: 1, 
                              px: { xs: 2, sm: 3 },
                              minWidth: { xs: '100%', sm: '100px' },
                              backgroundColor: '#1e40af',
                              borderRadius: '6px',
                              textTransform: 'none',
                              fontSize: '0.95rem',
                              '&:hover': {
                                backgroundColor: '#1e3a8a',
                              },
                            }}
                          >
                            {loading ? (
                              <CircularProgress size={22} color="inherit" />
                            ) : (
                              'Search'
                            )}
                          </Button>
                        </Box>

                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1.5,
                          width: { xs: '100%', sm: 'auto' },
                        }}>
                          <Typography variant="body2" sx={{ 
                            color: 'text.secondary',
                            fontWeight: 600,
                            display: { xs: 'none', md: 'block' },
                            fontSize: '0.9rem'
                          }}>
                            Display:
                          </Typography>
                          <ToggleButtonGroup
                            value={activeCard}
                            exclusive
                            onChange={handleCardChange}
                            aria-label="card display selection"
                            size="small"
                            color="primary"
                            sx={{
                              backgroundColor: alpha(theme.palette.primary.light, 0.05),
                              borderRadius: '8px',
                              padding: '3px',
                              width: { xs: '100%', sm: 'auto' },
                              '& .MuiToggleButton-root': {
                                px: { xs: 1, sm: 1.5 },
                                py: 0.75,
                                borderRadius: '6px',
                                borderColor: 'transparent',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                  backgroundColor: 'white',
                                  color: 'primary.main',
                                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                                  fontWeight: 600,
                                  '&:hover': {
                                    backgroundColor: 'white',
                                  }
                                },
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.light, 0.1),
                                  borderColor: 'transparent',
                                },
                                transition: 'all 0.2s ease',
                              },
                            }}
                          >
                            <ToggleButton value="all" aria-label="show all cards">
                              <GridViewIcon sx={{ mr: { xs: 0.5, sm: 0.75 }, fontSize: '1rem' }} />
                              <Box sx={{ display: { xs: 'block', sm: 'block' } }}>All</Box>
                            </ToggleButton>
                            <ToggleButton value="student" aria-label="show student card">
                              <SchoolIcon sx={{ mr: { xs: 0.5, sm: 0.75 }, fontSize: '1rem' }} />
                              <Box sx={{ display: { xs: 'block', sm: 'block' } }}>Student</Box>
                            </ToggleButton>
                            <ToggleButton value="info" aria-label="show info card">
                              <PersonIcon sx={{ mr: { xs: 0.5, sm: 0.75 }, fontSize: '1rem' }} />
                              <Box sx={{ display: { xs: 'block', sm: 'block' } }}>Info</Box>
                            </ToggleButton>
                            <ToggleButton value="candidacy" aria-label="show candidacy card">
                              <WorkIcon sx={{ mr: { xs: 0.5, sm: 0.75 }, fontSize: '1rem' }} />
                              <Box sx={{ display: { xs: 'block', sm: 'block' } }}>Candidacy</Box>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Box>
                      </Box>
                    </Paper>
                    
                    {/* Multiple Results Display */}
                    {multipleResults && (
                      <Fade in={!!multipleResults} timeout={500}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            mb: 2.5,
                            backgroundColor: 'white',
                            border: '1px solid rgba(100, 116, 139, 0.08)',
                            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                            borderRadius: '12px',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Multiple Results Found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Showing {multipleResults.length} of {totalResults} results
                            </Typography>
                          </Box>
                          <Stack spacing={2}>
                            {multipleResults.map((result, index) => (
                              <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                  p: 2,
                                  border: '1px solid rgba(100, 116, 139, 0.12)',
                                  borderRadius: '8px',
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                    cursor: 'pointer',
                                  },
                                }}
                                onClick={() => {
                                  setSearchResults(result);
                                  setMultipleResults(null);
                                }}
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                    <PersonIcon />
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                      {result.info ? `${result.info.FIRST_NAME} ${result.info.MIDDLE_NAME ? result.info.MIDDLE_NAME + ' ' : ''}${result.info.LAST_NAME}` : 'Unknown'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      ID: {result.info ? result.info.ID_NUM : 'N/A'}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Paper>
                            ))}
                          </Stack>
                          {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                              <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                  '& .MuiPaginationItem-root': {
                                    fontSize: '0.875rem',
                                    minWidth: 32,
                                    height: 32,
                                    borderRadius: '6px',
                                  },
                                }}
                              />
                            </Box>
                          )}
                        </Paper>
                      </Fade>
                    )}
                    
                    {/* Main content area - No Search Results */}
                    {!hasSearched && !loading && (
                      <Fade in={!hasSearched} timeout={800}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            mb: 2,
                            backgroundColor: 'white',
                            border: '1px solid rgba(100, 116, 139, 0.08)',
                            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            flexGrow: 1,
                            minHeight: '300px',
                            width: '100%',
                            maxWidth: {
                              xs: '100%', 
                              sm: '100%', 
                              md: !drawerOpen ? '1200px' : 'none', 
                              lg: !drawerOpen ? '1400px' : 'none', 
                            },
                            mx: {
                              xs: 0, 
                              sm: 0, 
                              md: !drawerOpen ? 'auto' : 0, 
                              lg: !drawerOpen ? 'auto' : 0, 
                            },
                          }}
                        >
                          <Box 
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              mb: 2
                            }}
                          >
                            <InfoOutlinedIcon 
                              color="primary" 
                              sx={{ fontSize: 30 }} 
                            />
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1,
                              color: theme.palette.text.primary
                            }}
                          >
                            No Search Results to Display
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: theme.palette.text.secondary,
                              maxWidth: 600,
                              mx: 'auto'
                            }}
                          >
                            Enter a student ID number in the search field above to view student information. 
                            The system will display all available records associated with the ID.
                          </Typography>
                        </Paper>
                      </Fade>
                    )}
                    
                    {noResults && (
                      <Fade in={noResults} timeout={500}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            mb: 2.5,
                            backgroundColor: 'white',
                            border: '1px solid rgba(100, 116, 139, 0.08)',
                            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                          }}
                        >
                          <Box 
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              backgroundColor: alpha(theme.palette.warning.main, 0.1),
                              mb: 2
                            }}
                          >
                            <ErrorOutlineIcon 
                              color="warning" 
                              sx={{ fontSize: 30 }} 
                            />
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1,
                              color: theme.palette.text.primary
                            }}
                          >
                            No Results Found
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: theme.palette.text.secondary,
                              maxWidth: 600,
                              mx: 'auto'
                            }}
                          >
                            No records were found for ID number <strong>{searchQuery}</strong>. Please verify the ID and try again, or contact the system administrator if you believe this is an error.
                          </Typography>
                        </Paper>
                      </Fade>
                    )}
                    
                    {searchResults && (
                      <Fade in={!!searchResults} timeout={500}>
                        <Box sx={{ 
                          width: '100%',
                          p: 0
                        }}>
                          <Grid 
                            container 
                            spacing={0}
                            columnSpacing={{ xs: 0, md: 2.4 }}
                            rowSpacing={2.4}
                            sx={{
                              width: '100%',
                              m: 0
                            }}
                          >
                            {/* Student Card */}
                            {(activeCard === 'all' || activeCard === 'student') && (
                              <Grid item xs={12} md={activeCard === 'all' ? 6 : 12} lg={activeCard === 'all' ? 4 : 12}>
                                {searchResults.student ? (
                                  <StudentCard data={searchResults.student} />
                                ) : (
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 3,
                                      backgroundColor: 'white',
                                      border: '1px solid rgba(100, 116, 139, 0.08)',
                                      boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: '12px',
                                      height: '100%',
                                      minHeight: '200px',
                                    }}
                                  >
                                    <Box 
                                      sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                                        mb: 2
                                      }}
                                    >
                                      <SchoolIcon 
                                        color="info" 
                                        sx={{ fontSize: 24 }} 
                                      />
                                    </Box>
                                    <Typography 
                                      variant="h6" 
                                      sx={{ 
                                        fontWeight: 600, 
                                        mb: 1,
                                        color: theme.palette.text.primary
                                      }}
                                    >
                                      No Student Record
                                    </Typography>
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        color: theme.palette.text.secondary,
                                        maxWidth: 300,
                                        mx: 'auto'
                                      }}
                                    >
                                      No student record was found for ID number <strong>{searchQuery}</strong>.
                                    </Typography>
                                  </Paper>
                                )}
                              </Grid>
                            )}
                            
                            {/* Info Card */}
                            {(activeCard === 'all' || activeCard === 'info') && (
                              <Grid item xs={12} md={activeCard === 'all' ? 6 : 12} lg={activeCard === 'all' ? 4 : 12}>
                                {searchResults.info ? (
                                  <InfoCard data={searchResults.info} />
                                ) : (
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 3,
                                      backgroundColor: 'white',
                                      border: '1px solid rgba(100, 116, 139, 0.08)',
                                      boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: '12px',
                                      height: '100%',
                                      minHeight: '200px',
                                    }}
                                  >
                                    <Box 
                                      sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                        mb: 2
                                      }}
                                    >
                                      <PersonIcon 
                                        color="secondary" 
                                        sx={{ fontSize: 24 }} 
                                      />
                                    </Box>
                                    <Typography 
                                      variant="h6" 
                                      sx={{ 
                                        fontWeight: 600, 
                                        mb: 1,
                                        color: theme.palette.text.primary
                                      }}
                                    >
                                      No Personal Information
                                    </Typography>
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        color: theme.palette.text.secondary,
                                        maxWidth: 300,
                                        mx: 'auto'
                                      }}
                                    >
                                      No personal information was found for ID number <strong>{searchQuery}</strong>.
                                    </Typography>
                                  </Paper>
                                )}
                              </Grid>
                            )}
                            
                            {/* Candidacy Card */}
                            {(activeCard === 'all' || activeCard === 'candidacy') && (
                              <Grid item xs={12} md={activeCard === 'all' ? 12 : 12} lg={activeCard === 'all' ? 4 : 12}>
                                {searchResults.candiday && searchResults.candiday.length > 0 ? (
                                  <CandidacyCard 
                                    data={searchResults.candiday} 
                                    fullScreen={activeCard === 'candidacy'}
                                  />
                                ) : (
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 3,
                                      backgroundColor: 'white',
                                      border: '1px solid rgba(100, 116, 139, 0.08)',
                                      boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: '12px',
                                      height: '100%',
                                      minHeight: '200px',
                                    }}
                                  >
                                    <Box 
                                      sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                                        mb: 2
                                      }}
                                    >
                                      <WorkIcon 
                                        color="success" 
                                        sx={{ fontSize: 24 }} 
                                      />
                                    </Box>
                                    <Typography 
                                      variant="h6" 
                                      sx={{ 
                                        fontWeight: 600, 
                                        mb: 1,
                                        color: theme.palette.text.primary
                                      }}
                                    >
                                      No Candidacy Records
                                    </Typography>
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        color: theme.palette.text.secondary,
                                        maxWidth: 300,
                                        mx: 'auto'
                                      }}
                                    >
                                      No candidacy records were found for ID number <strong>{searchQuery}</strong>.
                                    </Typography>
                                  </Paper>
                                )}
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Fade>
                    )}
                  </>
                ) : (
                  // Progress View
                  <Fade in={activeView === 'progress'} timeout={500}>
                    <Box sx={{ width: '100%' }}>
                      {searchResults ? (
                        <Progress data={searchResults} />
                      ) : (
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            backgroundColor: 'white',
                            border: '1px solid rgba(100, 116, 139, 0.08)',
                            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            height: '100%',
                            minHeight: '300px',
                          }}
                        >
                          <Box 
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              backgroundColor: alpha(theme.palette.info.main, 0.1),
                              mb: 2
                            }}
                          >
                            <InfoOutlinedIcon 
                              color="info" 
                              sx={{ fontSize: 30 }} 
                            />
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1,
                              color: theme.palette.text.primary
                            }}
                          >
                            No Data Available
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: theme.palette.text.secondary,
                              maxWidth: 600,
                              mx: 'auto'
                            }}
                          >
                            Please search for a student first to view their record completion status.
                          </Typography>
                        </Paper>
                      )}
                    </Box>
                  </Fade>
                )}
              </Box>
            </Box>
            
            {/* Footer */}
            <Box 
              component="footer" 
              sx={{ 
                py: 2, 
                backgroundColor: 'white',
                borderTop: '1px solid rgba(100, 116, 139, 0.12)',
                borderRadius: '12px 12px 0 0',
                textAlign: 'center',
                width: '100%',
                mt: 'auto',
              }}
            >
              <Stack direction="column" spacing={1} alignItems="center">
                <img 
                  src="/logo-AUI-02.png" 
                  alt="AUI University Logo" 
                  style={{ 
                    height: '25px', 
                    objectFit: 'contain',
                    marginBottom: '4px'
                  }} 
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center"
                  sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                >
                  © {new Date().getFullYear()} Al Akhawayn University Information System
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  align="center"
                  sx={{ fontSize: '0.7rem' }}
                >
                  All rights reserved. Authorized access only.
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  useEffect(() => {
    let meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/overview" 
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 