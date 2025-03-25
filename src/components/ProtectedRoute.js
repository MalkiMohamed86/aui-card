import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box, useTheme, useMediaQuery } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Temporarily bypass authentication
  return children;

  // Original authentication code (commented out)
  /*
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          padding: isMobile ? 2 : 3,
          background: 'linear-gradient(180deg, rgba(219, 234, 254, 0.3) 0%, rgba(248, 250, 252, 1) 100%)',
        }}
      >
        <CircularProgress size={isMobile ? 40 : 50} />
        {isMobile && (
          <Box sx={{ mt: 2, textAlign: 'center', color: '#4a5568', fontSize: '0.9rem', fontWeight: 500 }}>
            Loading your session...
          </Box>
        )}
      </Box>
    );
  }

  if (!user) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
  */
}

export default ProtectedRoute; 