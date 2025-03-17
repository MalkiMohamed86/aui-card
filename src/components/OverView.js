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
  alpha
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

// Mock data for the dashboard
const generateMockData = () => {
  // Student enrollment data by year
  const enrollmentData = [
    { year: '2019', students: 2100 },
    { year: '2020', students: 2300 },
    { year: '2021', students: 2450 },
    { year: '2022', students: 2600 },
    { year: '2023', students: 2800 },
  ];

  // Gender distribution
  const genderData = [
    { name: 'Male', value: 1680, color: '#0088FE' },
    { name: 'Female', value: 1120, color: '#FF8042' },
  ];

  // Program distribution
  const programData = [
    { name: 'Computer Science', students: 620, color: '#0088FE' },
    { name: 'Business Administration', students: 580, color: '#00C49F' },
    { name: 'Engineering', students: 520, color: '#FFBB28' },
    { name: 'Humanities', students: 380, color: '#FF8042' },
    { name: 'Social Sciences', students: 420, color: '#8884d8' },
    { name: 'Other', students: 280, color: '#82ca9d' },
  ];

  // GPA distribution
  const gpaData = [
    { range: '0.0-1.0', students: 45 },
    { range: '1.0-2.0', students: 180 },
    { range: '2.0-3.0', students: 950 },
    { range: '3.0-3.5', students: 1050 },
    { range: '3.5-4.0', students: 575 },
  ];

  // International student distribution
  const internationalData = [
    { name: 'Domestic', value: 2240, color: '#0088FE' },
    { name: 'International', value: 560, color: '#00C49F' },
  ];

  // Student performance by program
  const performanceData = [
    { program: 'CS', gpa: 3.2, retention: 92, graduation: 88 },
    { program: 'BBA', gpa: 3.1, retention: 90, graduation: 85 },
    { program: 'ENG', gpa: 3.3, retention: 94, graduation: 89 },
    { program: 'HUM', gpa: 3.4, retention: 88, graduation: 84 },
    { program: 'SOC', gpa: 3.0, retention: 86, graduation: 82 },
  ];

  // Top performing students
  const topStudents = [
    { id: 1, name: 'Sarah Johnson', program: 'Computer Science', gpa: 4.0, year: 'Senior' },
    { id: 2, name: 'Michael Chen', program: 'Engineering', gpa: 3.98, year: 'Junior' },
    { id: 3, name: 'Aisha Patel', program: 'Business Administration', gpa: 3.95, year: 'Senior' },
    { id: 4, name: 'David Kim', program: 'Computer Science', gpa: 3.93, year: 'Sophomore' },
    { id: 5, name: 'Emma Rodriguez', program: 'Humanities', gpa: 3.92, year: 'Junior' },
  ];

  // Student retention rates by year
  const retentionData = [
    { year: '2019', rate: 88 },
    { year: '2020', rate: 90 },
    { year: '2021', rate: 91 },
    { year: '2022', rate: 93 },
    { year: '2023', rate: 94 },
  ];

  // Student demographics by age
  const ageData = [
    { age: '18-20', students: 980 },
    { age: '21-23', students: 1240 },
    { age: '24-26', students: 420 },
    { age: '27-30', students: 110 },
    { age: '31+', students: 50 },
  ];

  // Course enrollment distribution
  const courseData = [
    { department: 'Computer Science', enrollments: 1850 },
    { department: 'Business', enrollments: 1620 },
    { department: 'Engineering', enrollments: 1480 },
    { department: 'Mathematics', enrollments: 1350 },
    { department: 'Humanities', enrollments: 980 },
    { department: 'Social Sciences', enrollments: 1120 },
    { department: 'Natural Sciences', enrollments: 1050 },
  ];

  return {
    enrollmentData,
    genderData,
    programData,
    gpaData,
    internationalData,
    performanceData,
    topStudents,
    retentionData,
    ageData,
    courseData
  };
};

const Overview = () => {
  const theme = useTheme();
  const [mockData, setMockData] = useState(null);
  const [academicYear, setAcademicYear] = useState('2023');

  useEffect(() => {
    // Generate mock data when component mounts
    setMockData(generateMockData());
  }, []);

  if (!mockData) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  // DataGrid columns for top students
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Student Name', width: 200 },
    { field: 'program', headerName: 'Program', width: 180 },
    { field: 'gpa', headerName: 'GPA', width: 100, type: 'number' },
    { field: 'year', headerName: 'Year', width: 120 },
  ];

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
            {payload[0].value} {payload[0].name === 'students' ? 'Students' : payload[0].name}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          University Student Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Comprehensive overview of student enrollment, demographics, and performance metrics
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Chip 
            icon={<SchoolIcon />} 
            label={`Total Students: 2,800`} 
            color="primary" 
            sx={{ fontWeight: 'bold', px: 2 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="academic-year-label">Academic Year</InputLabel>
            <Select
              labelId="academic-year-label"
              id="academic-year"
              value={academicYear}
              label="Academic Year"
              onChange={(e) => setAcademicYear(e.target.value)}
            >
              <MenuItem value="2019">2019-2020</MenuItem>
              <MenuItem value="2020">2020-2021</MenuItem>
              <MenuItem value="2021">2021-2022</MenuItem>
              <MenuItem value="2022">2022-2023</MenuItem>
              <MenuItem value="2023">2023-2024</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Key Metrics Cards */}
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
            <Typography variant="h3" component="div" fontWeight="bold" color="primary">
              2,800
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +7.7% from last year
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
              3.2
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +0.1 from last year
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
              94%
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +1% from last year
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
              86%
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +2% from last year
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Enrollment Trends and Gender Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Student Enrollment Trends
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={mockData.enrollmentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Gender Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#0088FE', mr: 1 }}>
                  <MaleIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Male
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    60%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#FF8042', mr: 1 }}>
                  <FemaleIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Female
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    40%
                  </Typography>
                </Box>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={mockData.genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockData.genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Program Distribution and GPA Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Program Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.programData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="students" name="Students">
                  {mockData.programData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              GPA Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.gpaData}
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

      {/* Student Performance Radar Chart and International Students */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Program Performance Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart outerRadius={150} data={mockData.performanceData}>
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
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              International vs. Domestic Students
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#0088FE', mr: 1 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Domestic
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    80%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#00C49F', mr: 1 }}>
                  <PublicIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    International
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    20%
                  </Typography>
                </Box>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={mockData.internationalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockData.internationalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Students Table */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Top Performing Students
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={mockData.topStudents}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Age Distribution and Course Enrollment */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Student Age Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.ageData}
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
              Course Enrollment by Department
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.courseData}
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
                data={mockData.retentionData}
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
    </Container>
  );
};

export default Overview;
