import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material/styles';
import { Paper, InputBase, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      onSearch(searchTerm);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      elevation={0}
      sx={{
        p: isMobile ? '2px 2px' : '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        mb: isMobile ? 2 : 3
      }}
    >
      <InputBase
        sx={{
          ml: isMobile ? 0.5 : 1,
          flex: 1,
          '& .MuiInputBase-input': {
            p: isMobile ? 0.75 : 1,
            fontSize: isMobile ? '0.875rem' : 'inherit',
            color: '#334155',
            '&::placeholder': {
              color: '#94a3b8',
              opacity: 1,
            },
          },
        }}
        placeholder={isMobile ? "Search..." : "Search by ID or Name"}
        inputProps={{ 'aria-label': 'search student records' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton 
        type="submit" 
        sx={{ 
          p: isMobile ? '8px' : '10px',
          color: '#0f3460',
          '&:hover': {
            backgroundColor: '#edf2f7',
          }
        }} 
        aria-label="search"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={isMobile ? 20 : 24} color="primary" /> : <SearchIcon fontSize={isMobile ? "small" : "medium"} />}
      </IconButton>
    </Paper>
  );
};

export default Search; 