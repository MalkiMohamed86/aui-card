import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper, InputBase, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

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
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        mb: 3
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          '& .MuiInputBase-input': {
            p: 1,
            color: '#334155',
            '&::placeholder': {
              color: '#94a3b8',
              opacity: 1,
            },
          },
        }}
        placeholder="Search by ID or Name"
        inputProps={{ 'aria-label': 'search student records' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton 
        type="submit" 
        sx={{ 
          p: '10px',
          color: '#0f3460',
          '&:hover': {
            backgroundColor: '#edf2f7',
          }
        }} 
        aria-label="search"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="primary" /> : <SearchIcon />}
      </IconButton>
    </Paper>
  );
};

export default Search; 