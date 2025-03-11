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
  useTheme
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';

const StudentCard = ({ data }) => {
  const theme = useTheme();
  
  if (!data) return null;

  const fields = [
    { label: 'ID Number', value: data.IDNUM, icon: <AssignmentIcon fontSize="small" color="primary" /> },
    { label: 'Employment Code', value: data.Stud_employ_cde },
    { label: 'Web Group', value: data.web_grp },
    { label: 'Tuition Code', value: data.tuition_cde },
    { label: 'Entrance Year', value: data.ENTRANCE_YR },
    { label: 'Entrance Term', value: data.ENTRANCE_TRM },
    { label: 'Current Class', value: data.CURRENT_CLASS_CDE },
    { label: 'Number of Courses', value: data.NUM_OF_CRS },
    { label: 'Hours Enrolled', value: data.HRS_ENROLLED },
    { label: 'Term Hours Earned', value: data.TRM_HRS_EARNED },
    { label: 'Career GPA', value: data.CAREER_GPA, icon: <GradeIcon fontSize="small" color="primary" /> },
    { label: 'Degree Code', value: data.DEGR_CDE },
    { label: 'Major', value: data.MAJOR_1 },
    { label: 'Minor', value: data.MINOR_1 },
    { label: 'Concentration', value: data.CONCENTRATION_1 }
  ];

  const identificationFields = fields.slice(0, 4);
  const enrollmentFields = fields.slice(4, 8);
  const academicFields = fields.slice(8);

  return (
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
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              boxShadow: '0 4px 10px rgba(14, 165, 233, 0.2)',
            }}
          >
            <SchoolIcon fontSize="large" />
          </Avatar>
        }
        title={
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 0px 1px rgba(14, 165, 233, 0.1)',
            }}
          >
            AUI Student Record
          </Typography>
        }
        subheader={
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={`ID: ${data.IDNUM || 'N/A'}`} 
              sx={{ 
                fontWeight: 500,
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                bgcolor: alpha('#0ea5e9', 0.1),
                color: '#0369a1',
                border: '1px solid ' + alpha('#0ea5e9', 0.2),
              }}
            />
          </Box>
        }
        sx={{ 
          pb: 0,
          backgroundColor: alpha('#0ea5e9', 0.03),
          borderBottom: '1px solid rgba(100, 116, 139, 0.08)'
        }}
      />
      
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0369a1', mb: 1 }}>
            Identification
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {identificationFields.map((field) => (
                  field.value && (
                    <TableRow key={field.label} sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'rgba(14, 165, 233, 0.04)' }
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
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0369a1', mb: 1 }}>
            Enrollment
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {enrollmentFields.map((field) => (
                  field.value && (
                    <TableRow key={field.label} sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'rgba(14, 165, 233, 0.04)' }
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
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0369a1', mb: 1 }}>
            Academic Information
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {academicFields.map((field) => (
                  field.value && (
                    <TableRow key={field.label} sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'rgba(14, 165, 233, 0.04)' }
                    }}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', pl: 1, color: '#64748b' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {field.icon && <Box sx={{ mr: 1 }}>{field.icon}</Box>}
                          {field.label}
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 1, color: '#334155' }}>
                        {field.label === 'Career GPA' ? (
                          <Chip 
                            label={field.value} 
                            color={parseFloat(field.value) >= 3.0 ? "success" : "warning"}
                            size="small"
                            sx={{
                              bgcolor: parseFloat(field.value) >= 3.0 ? alpha('#10b981', 0.1) : alpha('#f59e0b', 0.1),
                              color: parseFloat(field.value) >= 3.0 ? '#047857' : '#b45309',
                              border: parseFloat(field.value) >= 3.0 ? 
                                `1px solid ${alpha('#10b981', 0.2)}` : 
                                `1px solid ${alpha('#f59e0b', 0.2)}`,
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