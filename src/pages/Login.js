import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha,
  keyframes,
  useMediaQuery
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MicrosoftIcon from '@mui/icons-material/Microsoft';

// Define typing animation keyframes
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCursor = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #00712D }
`;

// Typing Text Component
const TypingText = ({ text, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Box
      sx={{
        visibility: isVisible ? 'visible' : 'hidden',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderRight: '3px solid',
        animation: isVisible ? `
          ${typing} ${isMobile ? '1.5s' : '2s'} steps(40, end),
          ${blinkCursor} 0.75s step-end infinite
        ` : 'none',
        width: 'fit-content',
        fontSize: isMobile ? '1.6rem' : '2rem',
      }}
    >
      {text}
    </Box>
  );
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00712D',
      light: '#2e8b57',
      dark: '#005724',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Inter", "Roboto", sans-serif',
  },
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleOutlookLogin = () => {
    window.location.href = 'https://tour.aui.ma/api/user';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/AUI-University-Ifrane-1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: { xs: 2, sm: 3 },
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            position: 'relative',
            zIndex: 2,
            width: isMobile ? '95%' : '460px',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              py: isMobile ? 3 : 4,
              px: isMobile ? 2.5 : 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
              borderRadius: isMobile ? '16px' : '20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #00712D, #2e8b57)',
                opacity: 0.8,
              },
            }}
          >
            <Box
              sx={{
                mb: isMobile ? 2.5 : 3.5,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src="/logo-AUI-02.png"
                alt="AUI University Logo"
                style={{
                  height: isMobile ? '55px' : '65px',
                  objectFit: 'contain',
                  marginBottom: isMobile ? '15px' : '20px',
                }}
              />
              
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: '#00712D',
                  textAlign: 'left',
                  fontSize: isMobile ? '1.6rem' : '2rem',
                  letterSpacing: '-0.01em',
                  mb: 0.75,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  pl: 1,
                }}
              >
                <TypingText text="Welcome to AUI" />
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: '#1e293b',
                  fontWeight: 500,
                  textAlign: 'center',
                  fontSize: isMobile ? '1rem' : '1.15rem',
                  opacity: 0,
                  animation: `${fadeIn} 0.5s ease-out forwards`,
                  animationDelay: '2s',
                  width: '100%',
                }}
              >
                Student Information System
              </Typography>
            </Box>

            <Box
              sx={{
                mb: isMobile ? 3 : 4,
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#1e293b',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.5,
                  opacity: 0.85,
                }}
              >
                Sign in with your university Outlook account
              </Typography>
            </Box>

            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<MicrosoftIcon />}
              onClick={handleOutlookLogin}
              sx={{
                py: isMobile ? 1.25 : 1.5,
                px: isMobile ? 4 : 6,
                width: '100%',
                maxWidth: isMobile ? '280px' : '320px',
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 500,
                backgroundColor: '#0078d4',
                '&:hover': {
                  backgroundColor: '#006cbe',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 15px rgba(0, 120, 212, 0.25)',
                },
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 120, 212, 0.2)',
              }}
            >
              Sign in with Outlook
            </Button>

            <Box 
              sx={{ 
                mt: isMobile ? 3 : 4,
                pt: isMobile ? 2 : 3, 
                textAlign: 'center',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                width: '100%',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#1e293b',
                  display: 'block',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  opacity: 0.75,
                  fontWeight: 500,
                }}
              >
                © {new Date().getFullYear()} Al Akhawayn University • All rights reserved
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

// Define fade in animation for subtitle
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
`;

export default Login; 