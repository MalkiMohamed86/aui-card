import React, { useState } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// components
import StudentCard from './components/StudentCard';
import InfoCard from './components/InfoCard';
import CandidacyCard from './components/CandidacyCard';

// Import the Login component
import Login from './pages/Login';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Modern blue
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4f46e5', // Indigo
      light: '#818cf8',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Emerald green
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // Modern red
      light: '#f87171',
      dark: '#b91c1c',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#0ea5e9', // Sky blue
      light: '#38bdf8',
      dark: '#0284c7',
    },
    background: {
      default: '#f0f4f8', // Very light blue-gray
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Slate 800
      secondary: '#64748b', // Slate 500
      disabled: '#94a3b8', // Slate 400
    },
    divider: 'rgba(100, 116, 139, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a1a1a1',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
        },
        elevation1: {
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
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
          borderRadius: 16,
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
          overflow: 'hidden',
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
          borderRadius: 10,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2563eb',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2563eb',
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: 'rgba(100, 116, 139, 0.2)',
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
            backgroundColor: alpha('#2563eb', 0.1),
            color: '#2563eb',
            '&:hover': {
              backgroundColor: alpha('#2563eb', 0.15),
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(100, 116, 139, 0.12)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(100, 116, 139, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(100, 116, 139, 0.12)',
        },
      },
    },
  },
});

// Sidebar width - increasing from 220px to 240px
const drawerWidth = 240;

function Dashboard() {
  const navigate = useNavigate();
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

  const handleLogout = () => {
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
      const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${resultsPerPage}`);
      setHasSearched(true);
      
      // Handle the Spring Boot response
      const data = response.data;
      
      if (Array.isArray(data)) {
        // Multiple results case
        if (data.length === 0) {
          setNoResults(true);
          setSearchResults(null);
        } else if (data.length === 1) {
          setSearchResults(data[0]);
        } else {
          setMultipleResults(data);
          setTotalPages(Math.ceil(data.length / resultsPerPage));
          setTotalResults(data.length);
          setSearchResults(null);
        }
      } else {
        // Single result case
        setSearchResults({
          info: data.info,
          student: data.student,
          candidacy: data.candiday || [] // Handle the Spring Boot property name
        });
        
        if (!data.student && !data.info && (!data.candiday || data.candiday.length === 0)) {
          setNoResults(true);
          setSearchResults(null);
        }
      }
    } catch (err) {
      console.error('Error searching:', err);
      setError('Error searching the database');
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
              selected={true}
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
                <DashboardIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Student Search" 
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
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeCard === 'all'}
              onClick={(e) => handleCardChange(e, 'all')}
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
                <GridViewIcon color={activeCard === 'all' ? 'primary' : 'inherit'} fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="All Records" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: activeCard === 'all' ? 500 : 400
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeCard === 'student'}
              onClick={(e) => handleCardChange(e, 'student')}
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
                <SchoolIcon color={activeCard === 'student' ? 'primary' : 'inherit'} fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Student" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: activeCard === 'student' ? 500 : 400
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeCard === 'info'}
              onClick={(e) => handleCardChange(e, 'info')}
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
                <PersonIcon color={activeCard === 'info' ? 'primary' : 'inherit'} fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Personal Info" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: activeCard === 'info' ? 500 : 400
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeCard === 'candidacy'}
              onClick={(e) => handleCardChange(e, 'candidacy')}
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
                <WorkIcon color={activeCard === 'candidacy' ? 'primary' : 'inherit'} fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Candidacy" 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: activeCard === 'candidacy' ? 500 : 400
                }} 
              />
            </ListItemButton>
          </ListItem>
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
        background: 'linear-gradient(180deg, rgba(219, 234, 254, 0.3) 0%, rgba(248, 250, 252, 1) 100%)',
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
              backgroundColor: 'rgba(240, 245, 250, 0.5)',
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
                          bgcolor: 'rgba(219, 234, 254, 0.4)', 
                          p: 0.8, 
                          borderRadius: '8px',
                          boxShadow: '0 2px 5px rgba(37, 99, 235, 0.1)',
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
                        Student Information System
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: 'text.secondary',
                          display: { xs: 'none', sm: 'block' },
                          fontSize: '0.9rem',
                          fontWeight: 400,
                        }}
                      >
                        Search student records efficiently
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                      borderColor: alpha(theme.palette.error.main, 0.5),
                      color: theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.05),
                        borderColor: theme.palette.error.main,
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

                {/* Search bar */}
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: { xs: 2, sm: 2.5 }, 
                    mb: 2.5, 
                    backgroundColor: 'white',
                    border: '1px solid rgba(100, 116, 139, 0.08)',
                    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                    borderRadius: '12px',
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
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            height: '42px',
                            '&.Mui-focused': {
                              borderColor: '#3b82f6',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: '#3b82f6',
                            }
                          },
                          width: { xs: '100%', sm: '280px' },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: '#3b82f6', fontSize: 'medium' }} />
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
                          backgroundColor: '#3b82f6',
                          borderRadius: '6px',
                          textTransform: 'none',
                          fontSize: '0.95rem',
                          '&:hover': {
                            backgroundColor: '#2563eb',
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
                          xs: '100%', // Full width on mobile
                          sm: '100%', // Full width on small tablets
                          md: !drawerOpen ? '1200px' : 'none', // 1200px on medium screens when drawer is closed
                          lg: !drawerOpen ? '1400px' : 'none', // 1400px on large screens when drawer is closed
                        },
                        mx: {
                          xs: 0, // No margin on mobile
                          sm: 0, // No margin on small tablets
                          md: !drawerOpen ? 'auto' : 0, // Auto margin on medium screens when drawer is closed
                          lg: !drawerOpen ? 'auto' : 0, // Auto margin on large screens when drawer is closed
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
                    <Grid 
                      container 
                      spacing={2.4}
                      sx={{
                        width: '100%',
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
                        <Grid item xs={12} md={activeCard === 'all' ? 6 : 12} lg={activeCard === 'all' ? 4 : 12}>
                          {searchResults.candidacy && searchResults.candidacy.length > 0 ? (
                            <CandidacyCard 
                              data={searchResults.candidacy} 
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App; 