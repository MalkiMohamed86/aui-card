import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  LinearProgress, 
  Chip,
  Card,
  CardContent,
  useTheme,
  CircularProgress
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { calculateStudentProgress, calculateInfoProgress, calculateCandidacyProgress } from '../utils/progressCalculator';

const Progress = ({ data }) => {
  const theme = useTheme();
  const [studentMissingFields, setStudentMissingFields] = useState([]);
  const [infoMissingFields, setInfoMissingFields] = useState([]);
  const [candidacyMissingFields, setCandidacyMissingFields] = useState([]);
  const [studentProgress, setStudentProgress] = useState(0);
  const [infoProgress, setInfoProgress] = useState(0);
  const [candidacyProgress, setCandidacyProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  // Field labels for better display
  const fieldLabels = {
    // Student fields
    idNum: 'ID Number',
    studentEmployCode: 'Employment Code',
    webGroup: 'Web Group',
    tuitionCode: 'Tuition Code',
    entranceYear: 'Entrance Year',
    entranceTerm: 'Entrance Term',
    currentClassCode: 'Current Class',
    numOfCourses: 'Number of Courses',
    hoursEnrolled: 'Hours Enrolled',
    termHoursEarned: 'Term Hours Earned',
    careerGpa: 'Career GPA',
    degreeCode: 'Degree Code',
    major1: 'Major',
    minor1: 'Minor',
    concentration1: 'Concentration',
    
    // Info fields
    id_num: 'ID Number',
    last_name: 'Last Name',
    first_name: 'First Name',
    middle_name: 'Middle Name',
    mobile_phone: 'Mobile Phone',
    email_address: 'Email Address',
    appid: 'Application ID',
    name_format: 'Name Format',
    birth_name: 'Birth Name',
    stud_mstr_employ: 'Employment Status',
    
    // Candidacy fields
    yearCode: 'Year Code',
    divisionCode: 'Division Code',
    stage: 'Stage',
    programCode: 'Program Code',
    termCode: 'Term Code',
    hsOrgTypeAd: 'HS Org Type',
    schoolType: 'School Type',
    clOrgTypeAd: 'CL Org Type',
    clGpa: 'CL GPA',
    clTotalApCredits: 'CL Total AP Credits',
    clTotalInstCredits: 'CL Total Inst Credits',
    act: 'ACT',
    gat: 'GAT',
    gre: 'GRE',
    sat: 'SAT',
    satRc: 'SAT Reading',
    satWc: 'SAT Writing',
    tef: 'TEF',
    toepp: 'TOEPP',
    birthDate: 'Birth Date',
    citizenOf: 'Citizenship',
    city: 'City',
    country: 'Country',
    addressLine1: 'Address',
    birthName: 'Birth Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    gender: 'Gender',
    mobile: 'Mobile',
    fatherAddress: 'Father Address',
    motherAddress: 'Mother Address',
    fatherPhone: 'Father Phone',
    motherPhone: 'Mother Phone',
    fatherOccupation: 'Father Occupation',
    motherOccupation: 'Mother Occupation',
    appFeeDate: 'Application Fee Date',
    udef1a1: 'Custom Field'
  };

  useEffect(() => {
    if (!data) return;

    // Calculate progress and find missing fields for Student data
    if (data.student) {
      const studentFields = [
        'idNum', 'studentEmployCode', 'webGroup', 'tuitionCode',
        'entranceYear', 'entranceTerm', 'currentClassCode',
        'numOfCourses', 'hoursEnrolled', 'termHoursEarned',
        'careerGpa', 'degreeCode', 'major1', 'minor1', 'concentration1'
      ];
      
      const missingFields = studentFields.filter(field => 
        data.student[field] === null || data.student[field] === undefined || data.student[field] === ''
      );
      
      setStudentMissingFields(missingFields);
      const progress = calculateStudentProgress(data.student);
      setStudentProgress(progress);
    }

    // Calculate progress and find missing fields for Info data
    if (data.info) {
      const infoFields = [
        'id_num', 'last_name', 'first_name', 'middle_name',
        'mobile_phone', 'email_address', 'appid',
        'name_format', 'birth_name', 'stud_mstr_employ'
      ];
      
      const missingFields = infoFields.filter(field => 
        data.info[field] === null || data.info[field] === undefined || data.info[field] === ''
      );
      
      setInfoMissingFields(missingFields);
      const progress = calculateInfoProgress(data.info);
      setInfoProgress(progress);
    }

    // Calculate progress and find missing fields for Candidacy data
    if (data.candiday && data.candiday.length > 0) {
      const candidacyFields = [
        'idNum', 'yearCode', 'divisionCode', 'stage', 'programCode', 'termCode',
        'hsOrgTypeAd', 'schoolType', 'clOrgTypeAd', 'clGpa', 'clTotalApCredits', 'clTotalInstCredits',
        'act', 'gat', 'gre', 'sat', 'satRc', 'satWc', 'tef', 'toepp',
        'birthDate', 'citizenOf', 'city', 'country', 'addressLine1', 'birthName',
        'firstName', 'lastName', 'emailAddress', 'gender', 'mobile',
        'fatherAddress', 'motherAddress', 'fatherPhone', 'motherPhone',
        'fatherOccupation', 'motherOccupation', 'appFeeDate', 'udef1a1'
      ];
      
      const currentRecord = data.candiday[0];
      const missingFields = candidacyFields.filter(field => 
        currentRecord[field] === null || currentRecord[field] === undefined || currentRecord[field] === ''
      );
      
      setCandidacyMissingFields(missingFields);
      const progress = calculateCandidacyProgress(data.candiday);
      setCandidacyProgress(progress);
    }

    // Calculate overall progress
    const totalFields = 15 + 10 + 38; // Student + Info + Candidacy fields
    const totalMissingFields = studentMissingFields.length + infoMissingFields.length + candidacyMissingFields.length;
    const totalFilledFields = totalFields - totalMissingFields;
    const overallProgressValue = Math.round((totalFilledFields / totalFields) * 100);
    setOverallProgress(overallProgressValue);
  }, [data, studentMissingFields.length, infoMissingFields.length, candidacyMissingFields.length]);

  if (!data) {
    return (
      <Box sx={{ p: 0, height: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
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
              backgroundColor: '#f3f4f6',
              mb: 2
            }}
          >
            <InfoOutlinedIcon 
              sx={{ fontSize: 30, color: '#4b5563' }} 
            />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              color: '#1f2937'
            }}
          >
            No Data Available
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6b7280',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Please search for a student to view their progress information.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Custom circular progress with label
  const CircularProgressWithLabel = ({ value, size = 120, thickness = 5, icon, color = '#0f3460' }) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={size}
            thickness={thickness}
            sx={{ color: '#e2e8f0', position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={value}
            size={size}
            thickness={thickness}
            sx={{ 
              color: color,
              position: 'relative',
              transform: 'rotate(-90deg)',
              circle: {
                strokeLinecap: 'round',
              }
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {icon && (
              <Box sx={{ color: color, mb: 0.5 }}>
                {icon}
              </Box>
            )}
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#2d3748' }}>
              {value}%
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  // Render a progress section with missing fields
  const renderProgressSection = (title, progress, missingFields, icon, color) => {
    return (
      <Card 
        elevation={0} 
        sx={{ 
          mb: 2.4,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          borderBottom: '1px solid #e2e8f0',
          borderLeft: `4px solid ${color}`,
        }}>
          <Box sx={{ color: color, mr: 1.5 }}>
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#2d3748',
            }}
          >
            {title}
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2.4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgressWithLabel 
                value={progress} 
                icon={icon} 
                color={color}
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2d3748', mb: 2 }}>
                  Missing Information
                </Typography>
                
                {missingFields.length === 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#2e7d32', p: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      All required fields have been filled
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ color: '#4a5568', mb: 2 }}>
                      The following fields are missing or incomplete:
                    </Typography>
                    
                    <Grid container spacing={1}>
                      {missingFields.map((field) => (
                        <Grid item xs={12} sm={6} key={field}>
                          <Chip
                            icon={<ErrorOutlineIcon />}
                            label={fieldLabels[field] || field}
                            sx={{
                              width: '100%',
                              justifyContent: 'flex-start',
                              py: 0.5,
                              backgroundColor: 'rgba(197, 48, 48, 0.1)',
                              color: '#c53030',
                              border: '1px solid rgba(197, 48, 48, 0.2)',
                              '& .MuiChip-icon': {
                                color: '#c53030',
                              },
                              fontWeight: 500
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
          Record Completion Analysis
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          View missing information and completion status
        </Typography>
      </Box> */}

      <Card 
        elevation={0} 
        sx={{ 
          mb: 2.4,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          borderBottom: '1px solid #e2e8f0',
          borderLeft: '4px solid #0f3460',
        }}>
          <Box sx={{ color: '#0f3460', mr: 1.5 }}>
            <AssignmentTurnedInIcon />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#2d3748',
            }}
          >
            Student Record Completion
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2.4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgressWithLabel 
                  value={overallProgress} 
                  size={160} 
                  thickness={6}
                  color="#0f3460"
                  icon={<AssignmentTurnedInIcon fontSize="large" />}
                />
                <Typography variant="body2" sx={{ mt: 2, color: '#4a5568', fontWeight: 500 }}>
                  {63 - (studentMissingFields.length + infoMissingFields.length + candidacyMissingFields.length)} of 63 fields completed
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748', mb: 2 }}>
                Al Akhawayn University Student Profile
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568', mb: 1 }}>
                  Overall Completion: {overallProgress}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={overallProgress} 
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#0f3460',
                    }
                  }}
                />
              </Box>
              
              <Grid container spacing={2.4}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '8px', 
                    bgcolor: '#edf2f7',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <SchoolIcon sx={{ color: '#0f3460', mr: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0f3460' }}>
                        Student Record
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f3460' }}>
                      {studentProgress}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#2c5282' }}>
                      {15 - studentMissingFields.length} of 15 fields
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '8px', 
                    bgcolor: '#edf2f7',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ color: '#4a5568', mr: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                        Personal Info
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#4a5568' }}>
                      {infoProgress}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                      {10 - infoMissingFields.length} of 10 fields
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '8px', 
                    bgcolor: '#edf2f7',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WorkIcon sx={{ color: '#2e7d32', mr: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                        Candidacy Info
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                      {candidacyProgress}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20' }}>
                      {38 - candidacyMissingFields.length} of 38 fields
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Student Progress Section */}
      {renderProgressSection(
        'Student Record Progress', 
        studentProgress, 
        studentMissingFields, 
        <SchoolIcon />,
        '#0f3460'
      )}
      
      {/* Info Progress Section */}
      {renderProgressSection(
        'Personal Information Progress', 
        infoProgress, 
        infoMissingFields, 
        <PersonIcon />,
        '#4a5568'
      )}
      
      {/* Candidacy Progress Section */}
      {renderProgressSection(
        'Candidacy Information Progress', 
        candidacyProgress, 
        candidacyMissingFields, 
        <WorkIcon />,
        '#2e7d32'
      )}
    </Box>
  );
};

export default Progress;
