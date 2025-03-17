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
  Tabs,
  Tab,
  Divider,
  Chip,
  Badge,
  Paper,
  Stack,
  alpha,
  useTheme,
  Grid,
  Button,
  Collapse,
  IconButton,
  LinearProgress
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GradeIcon from '@mui/icons-material/Grade';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { calculateCandidacyProgress } from '../utils/progressCalculator';

const CandidacyCard = ({ data, fullScreen = false }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const theme = useTheme();
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    education: false,
    testScores: false,
    personalDetails: false,
    family: false,
    application: false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  if (!data || data.length === 0) return null;

  const progress = calculateCandidacyProgress(data);

  // Handle tab change for records
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Handle section tab change
  const handleSectionChange = (event, newValue) => {
    setActiveSection(newValue);
    // Reset expanded sections when changing tabs
    setExpandedSections({
      education: false,
      testScores: false,
      personalDetails: false,
      family: false,
      application: false
    });
  };

  // Group fields into categories
  const programFields = [
    { label: 'ID Number', value: data[selectedTab].idNum },
    { label: 'Year Code', value: data[selectedTab].yearCode },
    { label: 'Division Code', value: data[selectedTab].divisionCode },
    { label: 'Stage', value: data[selectedTab].stage, chip: true },
    { label: 'Program Code', value: data[selectedTab].programCode },
    { label: 'Term Code', value: data[selectedTab].termCode }
  ];

  const educationFields = [
    { label: 'HS Org Type', value: data[selectedTab].hsOrgTypeAd },
    { label: 'School Type', value: data[selectedTab].schoolType },
    { label: 'CL Org Type', value: data[selectedTab].clOrgTypeAd },
    { label: 'CL GPA', value: data[selectedTab].clGpa },
    { label: 'CL Total AP Credits', value: data[selectedTab].clTotalApCredits },
    { label: 'CL Total Inst Credits', value: data[selectedTab].clTotalInstCredits }
  ];

  const testScoresFields = [
    { label: 'ACT', value: data[selectedTab].act },
    { label: 'GAT', value: data[selectedTab].gat },
    { label: 'GRE', value: data[selectedTab].gre },
    { label: 'SAT', value: data[selectedTab].sat },
    { label: 'SAT Reading', value: data[selectedTab].satRc },
    { label: 'SAT Writing', value: data[selectedTab].satWc },
    { label: 'TEF', value: data[selectedTab].tef },
    { label: 'TOEPP', value: data[selectedTab].toepp }
  ];

  const personalFields = [
    { 
      label: 'Birth Date', 
      value: data[selectedTab].birthDate ? new Date(data[selectedTab].birthDate).toLocaleDateString() : null,
      icon: <CalendarTodayIcon fontSize="small" color="info" />
    },
    { label: 'Citizenship', value: data[selectedTab].citizenOf },
    { 
      label: 'City', 
      value: data[selectedTab].city,
      icon: <LocationOnIcon fontSize="small" color="info" />
    },
    { label: 'Country', value: data[selectedTab].country },
    { label: 'Address', value: data[selectedTab].addressLine1 },
    { label: 'Birth Name', value: data[selectedTab].birthName },
    { label: 'First Name', value: data[selectedTab].firstName },
    { label: 'Last Name', value: data[selectedTab].lastName },
    { label: 'Email Address', value: data[selectedTab].emailAddress },
    { label: 'Gender', value: data[selectedTab].gender },
    { label: 'Mobile', value: data[selectedTab].mobile }
  ];

  const familyFields = [
    { label: 'Father Address', value: data[selectedTab].fatherAddress },
    { label: 'Mother Address', value: data[selectedTab].motherAddress },
    { label: 'Father Phone', value: data[selectedTab].fatherPhone },
    { label: 'Mother Phone', value: data[selectedTab].motherPhone },
    { label: 'Father Occupation', value: data[selectedTab].fatherOccupation },
    { label: 'Mother Occupation', value: data[selectedTab].motherOccupation }
  ];

  const applicationFields = [
    { label: 'Application Fee Date', value: data[selectedTab].appFeeDate ? new Date(data[selectedTab].appFeeDate).toLocaleDateString() : null },
    { label: 'Custom Field', value: data[selectedTab].udef1a1 }
  ];

  // Get stage color
  const getStageColor = (stage) => {
    switch(stage) {
      case 'ENR': return '#2e7d32';
      case 'APPLU': return '#2b6cb0';
      case 'READM': return '#ed8936';
      case 'NELG': return '#c53030';
      case 'UFUM': return '#4a5568';
      case 'ADM': return '#2e7d32';
      default: return '#a0aec0';
    }
  };

  // Render a table section
  const renderTableSection = (title, fields, icon) => (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ 
        fontWeight: 600, 
        color: '#00712D', 
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        '&::after': {
          content: '""',
          display: 'block',
          height: '2px',
          width: '30px',
          background: '#00712D',
          marginLeft: '8px',
          borderRadius: '2px',
        }
      }}>
        {icon && <Box sx={{ mr: 1, color: '#00712D' }}>{icon}</Box>}
        {title}
      </Typography>
      <TableContainer sx={{ 
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
      }}>
        <Table size="small">
          <TableBody>
            {fields.map((field) => (
              field.value && (
                <TableRow key={field.label} sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f8fafc' },
                  transition: 'background-color 0.2s ease',
                }}>
                  <TableCell 
                    component="th" 
                    scope="row" 
                    sx={{ 
                      fontWeight: 500, 
                      pl: 1.5,
                      color: '#4a5568',
                      borderBottom: `1px solid #e2e8f0`,
                      width: '40%',
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
                      pr: 1.5,
                      fontWeight: 500,
                      color: '#2d3748',
                      borderBottom: `1px solid #e2e8f0`,
                      width: '60%',
                    }}
                  >
                    {field.chip ? (
                      <Chip 
                        label={field.value} 
                        size="small" 
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: '6px',
                          boxShadow: field.label === 'Stage' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                          bgcolor: field.label === 'GPA' && field.value ? 
                            (parseFloat(field.value) >= 3.0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(237, 137, 54, 0.1)') : 
                            '#edf2f7',
                          color: field.label === 'GPA' && field.value ? 
                            (parseFloat(field.value) >= 3.0 ? '#2e7d32' : '#ed8936') : 
                            getStageColor(field.value),
                          border: field.label === 'GPA' && field.value ? 
                            (parseFloat(field.value) >= 3.0 ? '1px solid rgba(46, 125, 50, 0.2)' : '1px solid rgba(237, 137, 54, 0.2)') : 
                            '1px solid #e2e8f0',
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
  );

  // Render a collapsible section with a "Show More" button
  const renderCollapsibleSection = (title, fields, icon, sectionKey, previewCount = 3) => {
    const isExpanded = expandedSections[sectionKey];
    const displayFields = isExpanded ? fields : fields.slice(0, previewCount);
    const hasMore = fields.length > previewCount;

    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 600, 
            color: '#00712D', 
            display: 'flex',
            alignItems: 'center',
            '&::after': {
              content: '""',
              display: 'block',
              height: '2px',
              width: '30px',
              background: '#00712D',
              marginLeft: '8px',
              borderRadius: '2px',
            }
          }}>
            {icon && <Box sx={{ mr: 1, color: '#00712D' }}>{icon}</Box>}
            {title}
          </Typography>
          {hasMore && (
            <IconButton 
              size="small" 
              onClick={() => toggleSection(sectionKey)}
              sx={{ 
                color: '#00712D',
                backgroundColor: 'rgba(0, 113, 45, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 113, 45, 0.2)',
                }
              }}
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </Box>
        <TableContainer sx={{ 
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
        }}>
          <Table size="small">
            <TableBody>
              {displayFields.map((field) => (
                field.value && (
                  <TableRow key={field.label} sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f8fafc' },
                    transition: 'background-color 0.2s ease',
                  }}>
                    <TableCell 
                      component="th" 
                      scope="row" 
                      sx={{ 
                        fontWeight: 500, 
                        pl: 1.5,
                        color: '#4a5568',
                        borderBottom: `1px solid #e2e8f0`,
                        width: '40%',
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
                        pr: 1.5,
                        fontWeight: 500,
                        color: '#2d3748',
                        borderBottom: `1px solid #e2e8f0`,
                        width: '60%',
                      }}
                    >
                      {field.chip ? (
                        <Chip 
                          label={field.value} 
                          size="small" 
                          sx={{ 
                            fontWeight: 500,
                            borderRadius: '6px',
                            boxShadow: field.label === 'Stage' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                            bgcolor: field.label === 'GPA' && field.value ? 
                              (parseFloat(field.value) >= 3.0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(237, 137, 54, 0.1)') : 
                              '#edf2f7',
                            color: field.label === 'GPA' && field.value ? 
                              (parseFloat(field.value) >= 3.0 ? '#2e7d32' : '#ed8936') : 
                              getStageColor(field.value),
                            border: field.label === 'GPA' && field.value ? 
                              (parseFloat(field.value) >= 3.0 ? '1px solid rgba(46, 125, 50, 0.2)' : '1px solid rgba(237, 137, 54, 0.2)') : 
                              '1px solid #e2e8f0',
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
        {hasMore && !isExpanded && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Button 
              size="small" 
              onClick={() => toggleSection(sectionKey)}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ 
                textTransform: 'none',
                color: '#2e7d32',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                }
              }}
            >
              Show More
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <CardHeader
        avatar={
          <Badge badgeContent={data.length} color="primary" 
            sx={{ 
              '& .MuiBadge-badge': { 
                fontSize: '0.8rem', 
                height: '22px', 
                minWidth: '22px',
                fontWeight: 600,
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                bgcolor: '#00712D',
              } 
            }}
          >
            <Avatar 
              sx={{ 
                background: '#00712D',
                boxShadow: '0 4px 10px rgba(0, 113, 45, 0.2)',
              }}
            >
              <WorkIcon fontSize="large" />
            </Avatar>
          </Badge>
        }
        title={
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: '#00712D',
              }}
            >
              AUI Candidacy Information
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  flexGrow: 1,
                  height: 6,
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
              label={`ID: ${data[0]?.idNum || 'N/A'}`} 
              sx={{ 
                fontWeight: 500,
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                bgcolor: '#edf2f7',
                color: '#2e7d32',
                border: '1px solid #e2e8f0',
              }}
            />
          </Box>
        }
        sx={{ 
          pb: 0,
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          borderLeft: '4px solid #2e7d32'
        }}
      />
      
      {data.length > 1 && (
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            px: 2, 
            pt: 1,
            '& .MuiTab-root': {
              minHeight: '48px',
              fontWeight: 'medium',
              textTransform: 'none',
              borderRadius: '8px 8px 0 0',
              color: '#4a5568',
            },
            '& .Mui-selected': {
              fontWeight: 'bold',
              color: '#2e7d32',
              backgroundColor: 'rgba(46, 125, 50, 0.1)',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2e7d32',
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          {data.map((item, index) => (
            <Tab 
              key={index} 
              label={`Record ${index + 1}`} 
              icon={<SchoolIcon fontSize="small" />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Tabs 
          value={activeSection} 
          onChange={handleSectionChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'medium',
              textTransform: 'none',
              py: 1.5,
              color: '#4a5568',
            },
            '& .Mui-selected': {
              fontWeight: 'bold',
              color: '#2e7d32',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2e7d32',
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab 
            icon={<SchoolIcon fontSize="small" />} 
            iconPosition="start" 
            label="Academic Information" 
          />
          <Tab 
            icon={<PersonIcon fontSize="small" />} 
            iconPosition="start" 
            label="Personal Information" 
          />
        </Tabs>
      </Box>
      
      <CardContent sx={{ 
        p: 0, 
        overflowY: 'visible',
        maxHeight: 'none'
      }}>
        {activeSection === 0 && (
          <Box>
            {fullScreen ? (
              // Full-screen layout with grid
              <Grid container>
                <Grid item xs={12} md={6}>
                  {renderTableSection('Program Information', programFields, <AssignmentIcon color="primary" />)}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderTableSection('Test Scores', testScoresFields, <GradeIcon color="primary" />)}
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ opacity: 0.5 }} />
                  {renderTableSection('Education Background', educationFields, <SchoolIcon color="primary" />)}
                </Grid>
              </Grid>
            ) : (
              // Compact layout for grid view with collapsible sections
              <>
                {renderTableSection('Program Information', programFields, <AssignmentIcon color="primary" />)}
                <Divider sx={{ opacity: 0.5 }} />
                {renderCollapsibleSection('Education Background', educationFields, <SchoolIcon color="primary" />, 'education', 4)}
                <Divider sx={{ opacity: 0.5 }} />
                {renderCollapsibleSection('Test Scores', testScoresFields, <GradeIcon color="primary" />, 'testScores', 3)}
              </>
            )}
          </Box>
        )}
        
        {activeSection === 1 && (
          <Box>
            {fullScreen ? (
              // Full-screen layout with grid
              <Grid container>
                <Grid item xs={12} md={6}>
                  {renderTableSection('Personal Details', personalFields.slice(0, 6), <PersonIcon color="primary" />)}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderTableSection('Personal Details (cont.)', personalFields.slice(6), <PersonIcon color="primary" />)}
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ opacity: 0.5 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderTableSection('Family Information', familyFields, <FamilyRestroomIcon color="primary" />)}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderTableSection('Application Details', applicationFields, <AssignmentIcon color="primary" />)}
                </Grid>
              </Grid>
            ) : (
              // Compact layout for grid view with collapsible sections
              <>
                {renderCollapsibleSection('Personal Details', personalFields, <PersonIcon color="primary" />, 'personalDetails', 5)}
                <Divider sx={{ opacity: 0.5 }} />
                {renderCollapsibleSection('Family Information', familyFields, <FamilyRestroomIcon color="primary" />, 'family', 3)}
                <Divider sx={{ opacity: 0.5 }} />
                {renderCollapsibleSection('Application Details', applicationFields, <AssignmentIcon color="primary" />, 'application', 2)}
              </>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidacyCard; 