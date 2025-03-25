/*
 * Overview.js - University Analytics Dashboard
 * 
 * This component displays a comprehensive analytics dashboard for university student data.
 * It fetches data from the API endpoint using a CORS proxy in development mode.
 * 
 * All data processing is done on the client side to reduce database load. The raw student data
 * is transformed into the format needed for the dashboard visualizations.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
  Chip,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha,
  ToggleButtonGroup,
  ToggleButton,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  AlertTitle,
  IconButton,
  useMediaQuery
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PublicIcon from '@mui/icons-material/Public';
import GradeIcon from '@mui/icons-material/Grade';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
// Import the API utility
import { fetchStudentData } from '../utils/api';

// Loading Component
const LoadingDisplay = () => {
  const theme = useTheme();
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Loading Dashboard Data
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please wait while we fetch the latest information...
      </Typography>
    </Box>
  );
};

// Error Component
const ErrorDisplay = ({ error, onRetry }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderTop: `4px solid ${theme.palette.error.main}`,
          borderRadius: 2
        }}
      >
        <Alert 
          severity="error" 
          variant="outlined"
          sx={{ 
            mb: 3,
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          <AlertTitle sx={{ fontSize: '1.2rem' }}>Dashboard Error</AlertTitle>
          {error}
        </Alert>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          We encountered an error while loading the student data. 
          Please try again later or return to the dashboard.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          {onRetry && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              Try Again
            </Button>
          )}
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleBackToDashboard}
            startIcon={<ArrowBackIcon />}
          >
            Back to Dashboard
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

const Overview = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [rawStudentData, setRawStudentData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataView, setDataView] = useState('student'); // 'student' or 'candidacy'
  const [selectedYear, setSelectedYear] = useState('all'); // 'all' or specific year

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/dashboard'); // Navigate back to the main dashboard
  };

  // Function to process raw student data into dashboard format
  const processDashboardData = (data, yearFilter = 'all') => {
    if (!data || data.length === 0) {
      console.error('No data provided to process');
      return null;
    }

    // Filter by year if needed
    const filteredData = yearFilter !== 'all' 
      ? data.filter(student => student.yr_cde === yearFilter)
      : data;
    
    // Calculate key metrics
    const totalEnrollment = filteredData.length;
    
    const avgGpa = filteredData.reduce((sum, student) => {
      return sum + (parseFloat(student.career_gpa) || 0);
    }, 0) / (filteredData.length || 1);
    
    const studentsWithGoodStanding = filteredData.filter(student => 
      parseFloat(student.career_gpa) >= 2.0).length;
    const retentionRate = (studentsWithGoodStanding / (filteredData.length || 1)) * 100;
    
    const studentsOnTrackToGraduate = filteredData.filter(student => 
      parseFloat(student.career_gpa) >= 2.5).length;
    const graduationRate = (studentsOnTrackToGraduate / (filteredData.length || 1)) * 100;
    
    // Process enrollment data by year
    const enrollmentByYear = {};
    data.forEach(student => {
      const year = student.yr_cde;
      if (!year) return;
      
      enrollmentByYear[year] = (enrollmentByYear[year] || 0) + 1;
    });
    
    const enrollmentData = Object.keys(enrollmentByYear).map(year => ({
      year,
      students: enrollmentByYear[year]
    })).sort((a, b) => a.year.localeCompare(b.year));
    
    // Process gender distribution
    const genderCounts = {};
    filteredData.forEach(student => {
      const gender = student.gender || 'Undefined';
      genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    });
    
    const genderData = Object.keys(genderCounts).map(gender => ({
      name: gender,
      value: genderCounts[gender]
    }));
    
    // Process program distribution
    const programCounts = {};
    filteredData.forEach(student => {
      const program = student.major_1 || 'Undefined';
      programCounts[program] = (programCounts[program] || 0) + 1;
    });
    
    const programData = Object.keys(programCounts).map(program => ({
      name: program,
      students: programCounts[program]
    }));
    
    // Process GPA distribution
    const gpaRanges = {
      '0.0-1.0': 0,
      '1.0-2.0': 0,
      '2.0-3.0': 0,
      '3.0-3.5': 0,
      '3.5-4.0': 0
    };
    
    filteredData.forEach(student => {
      const gpa = parseFloat(student.career_gpa) || 0;
      if (gpa >= 0 && gpa < 1) gpaRanges['0.0-1.0']++;
      else if (gpa >= 1 && gpa < 2) gpaRanges['1.0-2.0']++;
      else if (gpa >= 2 && gpa < 3) gpaRanges['2.0-3.0']++;
      else if (gpa >= 3 && gpa < 3.5) gpaRanges['3.0-3.5']++;
      else if (gpa >= 3.5 && gpa <= 4) gpaRanges['3.5-4.0']++;
    });
    
    const gpaData = Object.keys(gpaRanges).map(range => ({
      range,
      students: gpaRanges[range]
    }));
    
    // Process international vs domestic
    const domesticCount = filteredData.filter(student => 
      student.international === 'Domestic').length;
    const internationalCount = filteredData.filter(student => 
      student.international === 'International').length;
    
    const internationalData = [
      { name: 'Domestic', value: domesticCount },
      { name: 'International', value: internationalCount }
    ];
    
    // Process performance by program
    const programPerformance = {};
    filteredData.forEach(student => {
      const program = student.major_1 || 'Undefined';
      const gpa = parseFloat(student.career_gpa) || 0;
      
      if (!programPerformance[program]) {
        programPerformance[program] = {
          gpas: [],
          goodStanding: 0,
          onTrackToGraduate: 0,
          total: 0
        };
      }
      
      programPerformance[program].gpas.push(gpa);
      programPerformance[program].total++;
      if (gpa >= 2.0) programPerformance[program].goodStanding++;
      if (gpa >= 2.5) programPerformance[program].onTrackToGraduate++;
    });
    
    const performanceData = Object.keys(programPerformance).map(program => {
      const data = programPerformance[program];
      const avgProgramGpa = data.gpas.reduce((sum, gpa) => sum + gpa, 0) / (data.gpas.length || 1);
      
      return {
        program,
        gpa: (avgProgramGpa * 25), // Scale to 0-100 for radar chart
        retention: (data.goodStanding / (data.total || 1)) * 100,
        graduation: (data.onTrackToGraduate / (data.total || 1)) * 100
      };
    });
    
    // Process retention rate by year
    const retentionByYear = {};
    data.forEach(student => {
      const year = student.yr_cde;
      if (!year) return;
      
      if (!retentionByYear[year]) {
        retentionByYear[year] = {
          total: 0,
          goodStanding: 0
        };
      }
      
      retentionByYear[year].total++;
      if (parseFloat(student.career_gpa) >= 2.0) {
        retentionByYear[year].goodStanding++;
      }
    });
    
    const retentionData = Object.keys(retentionByYear).map(year => ({
      year,
      rate: ((retentionByYear[year].goodStanding / (retentionByYear[year].total || 1)) * 100).toFixed(1)
    })).sort((a, b) => a.year.localeCompare(b.year));
    
    // Process age distribution
    const ageCounts = {
      '18-20': 0,
      '21-23': 0,
      '24-26': 0,
      '27-30': 0,
      '31+': 0
    };
    
    filteredData.forEach(student => {
      const age = student.age || 0;
      
      if (age >= 18 && age <= 20) ageCounts['18-20']++;
      else if (age >= 21 && age <= 23) ageCounts['21-23']++;
      else if (age >= 24 && age <= 26) ageCounts['24-26']++;
      else if (age >= 27 && age <= 30) ageCounts['27-30']++;
      else if (age >= 31) ageCounts['31+']++;
    });
    
    const ageData = Object.keys(ageCounts).map(range => ({
      age: range,
      students: ageCounts[range]
    }));
    
    // Process course data by department
    const courseCounts = {};
    filteredData.forEach(student => {
      const department = student.prog_cde || 'Undefined';
      courseCounts[department] = (courseCounts[department] || 0) + 1;
    });
    
    const courseData = Object.keys(courseCounts)
      .map(department => ({
        department,
        enrollments: courseCounts[department]
      }))
      .sort((a, b) => b.enrollments - a.enrollments);
    
    // Process class distribution
    const classCounts = {};
    filteredData.forEach(student => {
      const classLevel = student.seniority || 'Undefined';
      classCounts[classLevel] = (classCounts[classLevel] || 0) + 1;
    });
    
    const classDistribution = Object.keys(classCounts).map(classLevel => ({
      class: classLevel,
      students: classCounts[classLevel]
    }));
    
    // Process division distribution
    const divisionCounts = {};
    filteredData.forEach(student => {
      const division = student.div_cde || 'Undefined';
      divisionCounts[division] = (divisionCounts[division] || 0) + 1;
    });
    
    const divisionDistribution = Object.keys(divisionCounts).map(division => ({
      division,
      students: divisionCounts[division]
    }));
    
    // Process term distribution
    const termCounts = {};
    filteredData.forEach(student => {
      const term = student.entrance_term || 'Undefined';
      termCounts[term] = (termCounts[term] || 0) + 1;
    });
    
    const termDistribution = Object.keys(termCounts).map(term => ({
      term,
      students: termCounts[term]
    }));
    
    // Process country distribution
    const countryCounts = {};
    filteredData.forEach(student => {
      const country = student.country || 'Undefined';
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
    
    const countryDistribution = Object.keys(countryCounts)
      .map(country => ({
        country,
        students: countryCounts[country]
      }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 5);
    
    return {
      keyMetrics: {
        totalEnrollment,
        averageGpa: avgGpa.toFixed(2),
        retentionRate: retentionRate.toFixed(2),
        graduationRate: graduationRate.toFixed(2)
      },
      enrollmentData,
      genderData,
      programData,
      gpaData,
      internationalData,
      performanceData,
      retentionData,
      ageData,
      courseData,
      classDistribution,
      divisionDistribution,
      termDistribution,
      countryDistribution
    };
  };

  // Function to fetch data from the API
  const fetchDataFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the fetchStudentData utility to get data from the API
      const apiData = await fetchStudentData();
      
      // Process the API data
      setRawStudentData(apiData);
      const processedData = processDashboardData(apiData, selectedYear);
      setDashboardData(processedData);
    } catch (err) {
      console.error('Error fetching data from API:', err);
      setError('Error loading data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load data from the API
  useEffect(() => {
    // Fetch data from the API
    fetchDataFromAPI();
  }, []);
  
  useEffect(() => {
    if (rawStudentData) {
      // When the year filter changes, reprocess the data
      const processedData = processDashboardData(rawStudentData, selectedYear);
      setDashboardData(processedData);
    }
  }, [selectedYear, rawStudentData]);

  if (loading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchDataFromAPI} />;
  }

  // Get available years from enrollment data for the filter
  const getAvailableYears = () => {
    if (!rawStudentData) return [];
    
    // Extract unique years from student data
    const years = rawStudentData
      .map(student => student.yr_cde)
      .filter(year => !!year); // Filter out any null/undefined values
    
    // Sort years numerically and remove duplicates
    const sortedYears = [...new Set(years)].sort((a, b) => a.localeCompare(b));
    
    return ['all', ...sortedYears];
  };

  const getChartData = (data) => {
    if (!data) return [];
    return data;
  };

  // Check if we have actual enrollment data
  if (!dashboardData.enrollmentData || dashboardData.enrollmentData.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5">No enrollment data available in the database.</Typography>
      </Box>
    );
  }

  // Custom tooltip formatter for charts
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body1" color="text.primary" fontWeight="bold">
            {payload[0].value} {payload[0].name === 'students' ? 'Students' : 
                               payload[0].name === 'rate' ? '%' : 
                               payload[0].name}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  const handleDataViewChange = (event, newView) => {
    if (newView !== null) {
      setDataView(newView);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton 
          onClick={handleBackClick}
          sx={{ 
            mr: 2, 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            }
          }}
          aria-label="back to dashboard"
        >
          <ArrowBackIcon color="primary" />
        </IconButton>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
          University Analytics Dashboard
        </Typography>
      </Box>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Comprehensive overview of student enrollment, demographics, and performance metrics for international university management
      </Typography>
      
      {/* Data View Toggle - Moved to top for better visibility */}
      <Paper 
        elevation={2} 
        sx={{ 
          mb: 4, 
          mt: 3,
          borderRadius: 2, 
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tabs
          value={dataView}
          onChange={handleDataViewChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="data view tabs"
        >
          <Tab 
            value="student" 
            label="Student Records" 
            icon={<PersonIcon />} 
            iconPosition="start"
            sx={{ py: 2.5, fontSize: '1rem' }}
          />
          <Tab 
            value="candidacy" 
            label="Candidacy Information" 
            icon={<GroupsIcon />} 
            iconPosition="start"
            sx={{ py: 2.5, fontSize: '1rem' }}
          />
        </Tabs>
      </Paper>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mt: 2, 
        mb: { xs: 4, sm: 3 },
        gap: { xs: 2, sm: 0 }
      }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={{ xs: 1, sm: 2 }}
          sx={{ 
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          <Chip 
            icon={<SchoolIcon fontSize="small" />} 
            label={`Total Students: ${dashboardData.keyMetrics.totalEnrollment}`} 
            color="primary" 
            sx={{ 
              fontWeight: 'bold', 
              px: 2,
              height: { xs: 36, md: 42 },
              fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
              '& .MuiChip-icon': {
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }
            }}
          />
          <Chip 
            icon={<GradeIcon fontSize="small" />} 
            label={`Avg. GPA: ${dashboardData.keyMetrics.averageGpa}`} 
            color="success" 
            sx={{ 
              fontWeight: 'bold', 
              px: 2,
              height: { xs: 36, md: 42 },
              fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
              '& .MuiChip-icon': {
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }
            }}
          />
        </Stack>
        
        {/* Year Filter */}
        <FormControl 
          sx={{ 
            minWidth: { xs: '100%', sm: 175, md: 200, lg: 225 },
            maxWidth: { xs: '100%', sm: 200, md: 250, lg: 275 }
          }}
        >
          <InputLabel id="year-filter-label" sx={{ fontSize: { md: '1rem' } }}>Academic Year</InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            value={selectedYear}
            label="Academic Year"
            onChange={(e) => {
              setSelectedYear(e.target.value);
              // No need to fetch from server again - we just reprocess existing data
            }}
            size={isMediumScreen ? "medium" : "small"}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400,
                },
              },
            }}
            sx={{ 
              bgcolor: selectedYear !== 'all' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: selectedYear !== 'all' ? theme.palette.primary.main : undefined,
              },
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                py: { xs: 1.5, sm: 'inherit' },
                height: { xs: 'auto', sm: 'inherit' },
                fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
              }
            }}
          >
            <MenuItem value="all">
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                py: { md: 0.75 }
              }}>
                <CalendarTodayIcon 
                  sx={{ 
                    mr: 1.5, 
                    color: 'primary.main',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }} 
                />
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 500 
                  }}
                >
                  All Years
                </Typography>
              </Box>
            </MenuItem>
            {getAvailableYears().filter(year => year !== 'all').map(year => (
              <MenuItem key={year} value={year}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  py: { md: 0.75 }
                }}>
                  <SchoolIcon 
                    sx={{ 
                      mr: 1.5, 
                      color: 'primary.main',
                      fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }} 
                  />
                  <Typography 
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
                      fontWeight: 500 
                    }}
                  >
                    {year}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics Cards - Always visible */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Enrollment
            </Typography>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold" 
              color="primary"
              sx={{ 
                fontSize: dashboardData.keyMetrics.totalEnrollment > 10000 ? '1.75rem' : '2.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              {dashboardData.keyMetrics.totalEnrollment.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              {selectedYear !== 'all' 
                ? `Students enrolled in ${selectedYear}` 
                : 'Active students across all programs'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              backgroundColor: alpha(theme.palette.success.main, 0.1),
              borderLeft: `4px solid ${theme.palette.success.main}`,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Average GPA
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold" color="success.main">
              {dashboardData.keyMetrics.averageGpa}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              Overall academic performance
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              backgroundColor: alpha(theme.palette.info.main, 0.1),
              borderLeft: `4px solid ${theme.palette.info.main}`,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Retention Rate
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold" color="info.main">
              {dashboardData.keyMetrics.retentionRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              Students maintaining good standing
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              borderLeft: `4px solid ${theme.palette.warning.main}`,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Graduation Rate
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold" color="warning.main">
              {dashboardData.keyMetrics.graduationRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              Students on track to graduate
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* STUDENT DATA VIEW */}
      {dataView === 'student' && (
        <>
          {/* Enrollment Trends and GPA Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Student Enrollment Trends
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={dashboardData.enrollmentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  tick={({ x, y, payload }) => (
                    <g transform={`translate(${x},${y})`}>
                      <text 
                        x={0} 
                        y={0} 
                        dy={16} 
                        textAnchor="middle" 
                        fill={selectedYear !== 'all' && payload.value === selectedYear ? theme.palette.primary.main : theme.palette.text.primary}
                        fontWeight={selectedYear !== 'all' && payload.value === selectedYear ? 'bold' : 'normal'}
                      >
                        {payload.value}
                      </text>
                    </g>
                  )}
                />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                  activeDot={({ cx, cy, value, payload }) => {
                    // Highlight the dot if it corresponds to the selected year
                    const isSelectedYear = selectedYear !== 'all' && payload.year === selectedYear;
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={isSelectedYear ? 8 : 6} 
                        fill={isSelectedYear ? theme.palette.primary.main : theme.palette.primary.light}
                        stroke={isSelectedYear ? theme.palette.background.paper : theme.palette.primary.main}
                        strokeWidth={isSelectedYear ? 2 : 1}
                      />
                    );
                  }}
                />
                {/* Add label for selected year */}
                {selectedYear !== 'all' && (
                  <text
                    x="50%"
                    y="5%"
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    fill={theme.palette.primary.main}
                    fontWeight="bold"
                  >
                    Selected Year: {selectedYear}
                  </text>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
                  GPA Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={getChartData(dashboardData.gpaData)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="students" name="Students" fill={theme.palette.success.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

          {/* Program Distribution and Class Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Program Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={getChartData(dashboardData.programData)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="students" name="Students" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
                  Class Level Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                    data={getChartData(dashboardData.classDistribution)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                    <Bar dataKey="students" name="Students" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

          {/* Term Distribution and Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Term Distribution
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {selectedYear !== 'all' && (
                  <Chip 
                    size="small" 
                    label={`Year: ${selectedYear}`} 
                    color="primary" 
                    sx={{ ml: 1, height: 24 }} 
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {getChartData(dashboardData.termDistribution).map((data, index) => {
                    // Calculate percentage based on total of this dataset
                    const totalValue = dashboardData.termDistribution.reduce((sum, item) => sum + item.students, 0);
                    const percentage = ((data.students / totalValue) * 100).toFixed(0);
                    
                    // Get term full name
                    const termName = data.term === 'FA' ? 'Fall' : 
                                    data.term === 'SP' ? 'Spring' : 
                                    data.term === 'SU' ? 'Summer' : data.term;
                    
                    // Get color based on index
                    const color = index % 3 === 0 ? theme.palette.primary.main : 
                                 index % 3 === 1 ? theme.palette.secondary.main : 
                                 theme.palette.info.main;
                    
                    return (
                      <Box key={data.term} sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        mx: 2
                      }}>
                        <Avatar sx={{ 
                          bgcolor: color, 
                          width: 56, 
                          height: 56,
                          mb: 1
                        }}>
                          {data.term}
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" sx={{ color }}>
                          {termName}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {percentage}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({data.students} students)
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={getChartData(dashboardData.termDistribution)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="students"
                      nameKey="term"
                      label={({ term, percent }) => {
                        const termName = term === 'FA' ? 'Fall' : 
                                        term === 'SP' ? 'Spring' : 
                                        term === 'SU' ? 'Summer' : term;
                        return `${termName} ${(percent * 100).toFixed(0)}%`;
                      }}
                    >
                      {getChartData(dashboardData.termDistribution).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                          index % 3 === 0 ? theme.palette.primary.main : 
                          index % 3 === 1 ? theme.palette.secondary.main : 
                          theme.palette.info.main
                        } />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => {
                      const termName = name === 'FA' ? 'Fall' : 
                                      name === 'SP' ? 'Spring' : 
                                      name === 'SU' ? 'Summer' : name;
                      return [`${value} students`, termName];
                    }} />
                    <Legend formatter={(value) => {
                      return value === 'FA' ? 'Fall' : 
                             value === 'SP' ? 'Spring' : 
                             value === 'SU' ? 'Summer' : value;
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Program Performance Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart outerRadius={150} data={getChartData(dashboardData.performanceData)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="program" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="GPA (scaled)"
                  dataKey="gpa"
                  stroke={theme.palette.primary.main}
                  fill={theme.palette.primary.main}
                  fillOpacity={0.6}
                />
                <Radar
                  name="Retention Rate"
                  dataKey="retention"
                  stroke={theme.palette.success.main}
                  fill={theme.palette.success.main}
                  fillOpacity={0.6}
                />
                <Radar
                  name="Graduation Rate"
                  dataKey="graduation"
                  stroke={theme.palette.warning.main}
                  fill={theme.palette.warning.main}
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
          </Grid>

          {/* Retention Rate Trend */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Student Retention Rate Trends
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={getChartData(dashboardData.retentionData)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip content={customTooltip} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      name="Retention Rate (%)"
                      stroke={theme.palette.info.main}
                      strokeWidth={2}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* CANDIDACY DATA VIEW */}
      {dataView === 'candidacy' && (
        <>
          {/* Gender Distribution and International vs. Domestic */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Gender Distribution
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {selectedYear !== 'all' && (
                  <Chip 
                    size="small" 
                    label={`Year: ${selectedYear}`} 
                    color="primary" 
                    sx={{ ml: 1, height: 24 }} 
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {/* Filter out any null or invalid gender data */}
                  {getChartData(dashboardData.genderData)
                    .filter(gender => gender.name === 'M' || gender.name === 'F' || 
                                     gender.name === 'Male' || gender.name === 'Female')
                    .map((gender) => {
                      // Determine gender display name and icon
                      const genderName = gender.name === 'M' ? 'Male' : 
                                        gender.name === 'F' ? 'Female' : 
                                        gender.name;
                      const isMale = gender.name === 'Male' || gender.name === 'M';
                      
                      // Calculate percentage of total enrollment
                      const totalValue = getChartData(dashboardData.genderData)
                        .filter(g => g.name === 'M' || g.name === 'F' || 
                                    g.name === 'Male' || g.name === 'Female')
                        .reduce((sum, item) => sum + item.value, 0);
                      
                      const percentage = ((gender.value / totalValue) * 100).toFixed(0);
                      
                      return (
                        <Box key={gender.name} sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mx: 3,
                          flexDirection: 'column',
                          textAlign: 'center'
                        }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: isMale ? '#0088FE' : '#FF8042', 
                              width: 56, 
                              height: 56,
                              mb: 1
                            }}
                          >
                            {isMale ? <MaleIcon fontSize="large" /> : <FemaleIcon fontSize="large" />}
                          </Avatar>
                          <Typography variant="h6" fontWeight="bold" color={isMale ? 'primary' : 'secondary'}>
                            {genderName}
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {percentage}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ({gender.value} students)
                          </Typography>
                        </Box>
                      );
                    })}
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={getChartData(dashboardData.genderData).filter(gender => 
                        gender.name === 'M' || gender.name === 'F' || 
                        gender.name === 'Male' || gender.name === 'Female'
                      )}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => {
                        const displayName = name === 'M' ? 'Male' : name === 'F' ? 'Female' : name;
                        return `${displayName} ${(percent * 100).toFixed(0)}%`;
                      }}
                    >
                      {getChartData(dashboardData.genderData).map((entry, index) => {
                        const isMale = entry.name === 'Male' || entry.name === 'M';
                        return (
                          <Cell key={`cell-${index}`} fill={isMale ? '#0088FE' : '#FF8042'} />
                        );
                      })}
                    </Pie>
                    <Tooltip formatter={(value, name) => {
                      const displayName = name === 'M' ? 'Male' : name === 'F' ? 'Female' : name;
                      return [`${value} students`, displayName];
                    }} />
                    <Legend formatter={(value) => {
                      return value === 'M' ? 'Male' : value === 'F' ? 'Female' : value;
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              International vs. Domestic Students
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {getChartData(dashboardData.internationalData).map((data) => {
                // Calculate percentage based on total of this dataset
                const totalValue = getChartData(dashboardData.internationalData).reduce((sum, item) => sum + item.value, 0);
                const percentage = ((data.value / totalValue) * 100).toFixed(0);
                
                return (
                  <Box key={data.name} sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    mx: 3
                  }}>
                    <Avatar sx={{ 
                      bgcolor: data.name === 'Domestic' ? '#0088FE' : '#00C49F', 
                      width: 56, 
                      height: 56,
                      mb: 1
                    }}>
                      {data.name === 'Domestic' ? <SchoolIcon fontSize="large" /> : <PublicIcon fontSize="large" />}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" color={data.name === 'Domestic' ? 'primary' : 'success'}>
                      {data.name}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {percentage}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({data.value} students)
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getChartData(dashboardData.internationalData)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {getChartData(dashboardData.internationalData).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Domestic' ? '#0088FE' : '#00C49F'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} students`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

          {/* Age Distribution and Division Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
                  Student Age Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                    data={getChartData(dashboardData.ageData)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                    <Bar dataKey="students" name="Students" fill={theme.palette.info.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Division Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {getChartData(dashboardData.divisionDistribution).map((data, index) => {
                // Calculate percentage based on total of this dataset
                const totalValue = getChartData(dashboardData.divisionDistribution).reduce((sum, item) => sum + item.students, 0);
                const percentage = ((data.students / totalValue) * 100).toFixed(0);
                
                return (
                  <Box key={data.division} sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    mx: 3
                  }}>
                    <Avatar sx={{ 
                      bgcolor: index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main, 
                      width: 56, 
                      height: 56,
                      mb: 1
                    }}>
                      {data.division}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" color={index % 2 === 0 ? 'primary' : 'secondary'}>
                      {data.division === 'UG' ? 'Undergraduate' : 
                       data.division === 'GR' ? 'Graduate' : data.division}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {percentage}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({data.students} students)
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getChartData(dashboardData.divisionDistribution)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="students"
                  nameKey="division"
                  label={({ division, percent }) => {
                    const displayName = division === 'UG' ? 'Undergraduate' : 
                                       division === 'GR' ? 'Graduate' : division;
                    return `${displayName} ${(percent * 100).toFixed(0)}%`;
                  }}
                >
                  {getChartData(dashboardData.divisionDistribution).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => {
                  const displayName = name === 'UG' ? 'Undergraduate' : 
                                     name === 'GR' ? 'Graduate' : name;
                  return [`${value} students`, displayName];
                }} />
                <Legend formatter={(value) => {
                  return value === 'UG' ? 'Undergraduate' : 
                         value === 'GR' ? 'Graduate' : value;
                }} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

          {/* Course Enrollment and Country Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Course Enrollment by Department
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={getChartData(dashboardData.courseData)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" width={150} />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="enrollments" name="Enrollments" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Student Country Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedYear !== 'all' && (
              <Chip 
                size="small" 
                label={`Year: ${selectedYear}`} 
                color="primary" 
                sx={{ ml: 1, height: 24 }} 
              />
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={getChartData(dashboardData.countryDistribution).map(item => ({
                  ...item,
                  countryName: item.country === 'MA' ? 'Morocco' :
                              item.country === 'FR' ? 'France' :
                              item.country === 'US' ? 'United States' :
                              item.country === 'SN' ? 'Senegal' :
                              item.country === 'Undefined' ? 'Undefined Country' :
                              item.country
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="countryName" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => {
                  return [`${value} students`, props.payload.countryName];
                }} />
                <Legend />
                <Bar 
                  dataKey="students" 
                  name="Students" 
                  fill={theme.palette.warning.main}
                  // Color undefined countries differently
                  fillOpacity={({ payload }) => payload.country === 'Undefined' ? 0.5 : 1}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
        </>
      )}
    </Container>
  );
};

export default Overview;
