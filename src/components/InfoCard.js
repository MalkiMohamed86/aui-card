import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow,
  CardHeader,
  Avatar,
  Box,
  Divider,
  Chip,
  IconButton,
  Stack,
  alpha,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const InfoCard = ({ data }) => {
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });
  
  if (!data) return null;

  // full name format
  const fullName = `${data.FIRST_NAME || ''} ${data.MIDDLE_NAME ? data.MIDDLE_NAME + ' ' : ''}${data.LAST_NAME || ''}`.trim();

  // Define fields to display
  const personalFields = [
    { label: 'ID Number', value: data.ID_NUM, icon: <BadgeIcon fontSize="small" color="secondary" /> },
    { label: 'Last Name', value: data.LAST_NAME },
    { label: 'First Name', value: data.FIRST_NAME },
    { label: 'Middle Name', value: data.MIDDLE_NAME }
  ];

  const contactFields = [
    { 
      label: 'Mobile Phone', 
      value: data.MOBILE_PHONE, 
      icon: <PhoneIcon fontSize="small" color="secondary" />,
      copyable: true
    },
    { 
      label: 'Email Address', 
      value: data.EMAIL_ADDRESS, 
      icon: <EmailIcon fontSize="small" color="secondary" />,
      copyable: true
    }
  ];

  const otherFields = [
    { label: 'App ID', value: data.APPID },
    { label: 'Name Format', value: data.NAME_FORMAT },
    { label: 'Birth Name', value: data.BIRTH_NAME },
    { label: 'Employment Status', value: data.STUD_MSTR_EMPLOY }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({
      open: true,
      message: 'Copied'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <>
      <Card 
        elevation={0} 
        sx={{ 
          height: '100%', 
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          backgroundColor: 'rgba(248, 250, 252, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(100, 116, 139, 0.08)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 'rgba(0, 0, 0, 0.06) 0px 10px 30px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px',
          }
        }}
      >
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)',
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
          }
          title={
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 0px 1px rgba(79, 70, 229, 0.1)',
              }}
            >
              AUI Personal Information
            </Typography>
          }
          subheader={
            <Box sx={{ mt: 1 }}>
              <Chip 
                label={fullName || 'No Name'} 
                sx={{ 
                  fontWeight: 500,
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  bgcolor: alpha('#4f46e5', 0.1),
                  color: '#4338ca',
                  border: '1px solid ' + alpha('#4f46e5', 0.2),
                }}
              />
            </Box>
          }
          sx={{ 
            pb: 0,
            backgroundColor: alpha(theme.palette.secondary.main, 0.03),
            borderBottom: '1px solid rgba(100, 116, 139, 0.08)'
          }}
        />
        
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4338ca', mb: 1 }}>
              Personal Details
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {personalFields.map((field) => (
                    field.value && (
                      <TableRow key={field.label} sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(79, 70, 229, 0.04)' }
                      }}>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', pl: 1, color: '#64748b' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                            {field.label}
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ pr: 1, color: '#334155' }}>{field.value}</TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4338ca', mb: 1 }}>
              Contact Information
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {contactFields.map((field) => (
                    field.value && (
                      <TableRow key={field.label} sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(79, 70, 229, 0.04)' }
                      }}>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', pl: 1, color: '#64748b' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                            {field.label}
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ pr: 1, color: '#334155' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {field.value}
                            {field.copyable && (
                              <IconButton 
                                size="small" 
                                onClick={() => handleCopy(field.value)}
                                sx={{ ml: 1, color: '#4f46e5' }}
                              >
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4338ca', mb: 1 }}>
              Additional Information
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {otherFields.map((field) => (
                    field.value && (
                      <TableRow key={field.label} sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(79, 70, 229, 0.04)' }
                      }}>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', pl: 1, color: '#64748b' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                            {field.label}
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ pr: 1, color: '#334155' }}>{field.value}</TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ bgcolor: '#d3dce0' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InfoCard; 