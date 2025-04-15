import { Box, Typography, TextField, Button, InputAdornment, Paper, Select, MenuItem, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

export default function AddNewTask() {
  const theme = useTheme();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [points, setPoints] = useState('');

  // List of available cities
  const cities = [
    'All Cities',
    'San Francisco',
    'Berlin',
    'Buenos Aires',
    'Tokyo',
    'Seoul',
    'Hyderabad',
    'Taipei'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would add the task to the database
    // All tasks need approval by default
    console.log({ 
      taskName, 
      description, 
      // Convert "All Cities" to null for the backend
      targetCity: city === 'All Cities' ? null : city, 
      submissionDate,
      points: Number(points),
      needsApproval: true 
    });
    
    // Reset form
    setTaskName('');
    setDescription('');
    setCity('');
    setSubmissionDate('');
    setPoints('');
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        sx={{ 
          textAlign: 'center',
          mb: 3
        }}
      >
        Add New Task
      </Typography>
      
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'white'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            placeholder="Task Name*"
            variant="outlined"
            fullWidth
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                bgcolor: '#f5f5f5'
              }
            }}
          />
          
          <TextField
            placeholder="Description of the Task..."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                bgcolor: '#f5f5f5'
              }
            }}
          />
          
          <FormControl fullWidth variant="outlined">
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Which city it should display for?</span>;
                }
                return selected;
              }}
              sx={{ 
                bgcolor: '#f5f5f5',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main
                }
              }}
              inputProps={{
                sx: { py: 1.5 }
              }}
            >
              {cities.map((cityOption) => (
                <MenuItem key={cityOption} value={cityOption}>
                  {cityOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            type="number"
            label="Points"
            variant="outlined"
            fullWidth
            required
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StarIcon sx={{ color: '#f8c740' }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: '#f5f5f5',
                borderRadius: '4px'
              }
            }}
          />
          
          <TextField
            type="date"
            label="Submission Deadline"
            variant="outlined"
            fullWidth
            required
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              sx: {
                bgcolor: '#f5f5f5',
                borderRadius: '4px'
              }
            }}
          />
          
          <Button 
            variant="contained" 
            type="submit"
            startIcon={<AddIcon />}
            sx={{ 
              alignSelf: 'center',
              borderRadius: '4px',
              fontWeight: 'bold',
              bgcolor: '#f8c740',
              color: 'black',
              '&:hover': {
                bgcolor: '#e0b43a',
              },
              px: 3,
              py: 1,
              mt: 1
            }}
          >
            ADD
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}