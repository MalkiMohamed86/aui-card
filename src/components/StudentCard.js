import React from 'react';
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
  Stack,
  alpha,
  useTheme,
  LinearProgress,
  useMediaQuery
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import { calculateStudentProgress } from '../utils/progressCalculator';

const StudentCard = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!data) return null;

  const progress = calculateStudentProgress(data);

  const fields = [
    { label: 'ID Number', value: data.idNum, icon: <AssignmentIcon fontSize={isMobile ? "small" : "small"} color="primary" /> },
    { label: 'Employment Code', value: data.studentEmployCode },
    { label: 'Web Group', value: data.webGroup },
    { label: 'Tuition Code', value: data.tuitionCode },
    { label: 'Entrance Year', value: data.entranceYear },
    { label: 'Entrance Term', value: data.entranceTerm },
    { label: 'Current Class', value: data.currentClassCode },
    { label: 'Number of Courses', value: data.numOfCourses },
    { label: 'Hours Enrolled', value: data.hoursEnrolled },
    { label: 'Term Hours Earned', value: data.termHoursEarned },
    { label: 'Career GPA', value: data.careerGpa, icon: <GradeIcon fontSize={isMobile ? "small" : "small"} color="primary" /> },
    { label: 'Degree Code', value: data.degreeCode },
    { label: 'Major', value: data.major1 },
    { label: 'Minor', value: data.minor1 },
    { label: 'Concentration', value: data.concentration1 }
  ];

  const identificationFields = fields.slice(0, 4);
  const enrollmentFields = fields.slice(4, 8);
  const academicFields = fields.slice(8);

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        '&:hover': {
          transform: isMobile ? 'none' : 'translateY(-5px)',
          boxShadow: isMobile ? '0 2px 6px rgba(0, 0, 0, 0.05)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            sx={{ 
              background: '#00712D',
              boxShadow: '0 4px 10px rgba(0, 113, 45, 0.2)',
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48
            }}
          >
            <SchoolIcon fontSize={isMobile ? "small" : "medium"} />
          </Avatar>
        }
        title={
          <Box>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              sx={{ 
                fontWeight: 'bold',
                color: '#00712D',
              }}
            >
              AUI Student Record
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  flexGrow: 1,
                  height: isMobile ? 4 : 6,
                  borderRadius: 3,
                  bgcolor: '#edf2f7',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#00712D',
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 500 }}>
                {progress}%
              </Typography>
            </Box>
          </Box>
        }
        subheader={
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={`ID: ${data.idNum || 'N/A'}`} 
              size={isMobile ? "small" : "medium"}
              sx={{ 
                fontWeight: 500,
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                bgcolor: '#edf2f7',
                color: '#0f3460',
                border: '1px solid #e2e8f0',
              }}
            />
          </Box>
        }
        sx={{ 
          pb: 0,
          pt: isMobile ? 1.5 : 2,
          px: isMobile ? 1.5 : 2,
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          borderLeft: '4px solid #0f3460'
        }}
      />
      
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: isMobile ? 1.5 : 2 }}>
          <Typography variant={isMobile ? "body1" : "subtitle1"} sx={{ fontWeight: 'bold', color: '#0f3460', mb: 1 }}>
            Identification
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {identificationFields.map((field) => (
                  (field.value !== null && field.value !== undefined && (field.value !== '' || field.value === 0)) && (
                    <TableRow key={field.label} sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ 
                          fontWeight: 'bold', 
                          pl: isMobile ? 0.5 : 1, 
                          color: '#4a5568',
                          fontSize: isMobile ? '0.8125rem' : 'inherit',
                          py: isMobile ? 0.75 : 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                          {field.label}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ 
                          pr: isMobile ? 0.5 : 1, 
                          color: '#2d3748',
                          fontSize: isMobile ? '0.8125rem' : 'inherit',
                          py: isMobile ? 0.75 : 1
                        }}
                      >
                        {field.value}
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: isMobile ? 1.5 : 2 }}>
          <Typography variant={isMobile ? "body1" : "subtitle1"} sx={{ fontWeight: 'bold', color: '#0f3460', mb: 1 }}>
            Enrollment
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {enrollmentFields.map((field) => (
                  (field.value !== null && field.value !== undefined && (field.value !== '' || field.value === 0)) && (
                    <TableRow key={field.label} sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ 
                          fontWeight: 'bold', 
                          pl: isMobile ? 0.5 : 1, 
                          color: '#4a5568',
                          fontSize: isMobile ? '0.8125rem' : 'inherit',
                          py: isMobile ? 0.75 : 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                          {field.label}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ 
                          pr: isMobile ? 0.5 : 1, 
                          color: '#2d3748',
                          fontSize: isMobile ? '0.8125rem' : 'inherit',
                          py: isMobile ? 0.75 : 1
                        }}
                      >
                        {field.value}
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: isMobile ? 1.5 : 2 }}>
          <Typography variant={isMobile ? "body1" : "subtitle1"} sx={{ fontWeight: 'bold', color: '#0f3460', mb: 1 }}>
            Academic Information
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {academicFields.map((field) => (
                  (field.value !== null && field.value !== undefined && (field.value !== '' || field.value === 0)) && (
                    <TableRow key={field.label} sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ 
                          fontWeight: 'bold', 
                          pl: isMobile ? 0.5 : 1, 
                          color: '#4a5568',
                          fontSize: isMobile ? '0.8125rem' : 'inherit',
                          py: isMobile ? 0.75 : 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                          {field.label}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ 
                          pr: isMobile ? 0.5 : 1, 
                          color: '#2d3748',
                          fontSize: isMobile ? '0.8125rem' : 'inherit',
                          py: isMobile ? 0.75 : 1
                        }}
                      >
                        {field.label === 'Career GPA' ? (
                          <Chip 
                            label={field.value} 
                            color={parseFloat(field.value) >= 3.0 ? "success" : "warning"}
                            size="small"
                            sx={{
                              bgcolor: parseFloat(field.value) >= 3.0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(237, 137, 54, 0.1)',
                              color: parseFloat(field.value) >= 3.0 ? '#2e7d32' : '#ed8936',
                              border: parseFloat(field.value) >= 3.0 ? 
                                '1px solid rgba(46, 125, 50, 0.2)' : 
                                '1px solid rgba(237, 137, 54, 0.2)',
                              fontWeight: 600
                            }}
                          />
                        ) : field.value}
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentCard; 