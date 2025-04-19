import { Box, Typography, TextField, Button, InputAdornment, Paper, Select, MenuItem, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import AdminAPI from '@services/AdminApi.jsx';
import { getAuth } from 'firebase/auth';

export default function AddNewTask() {
  const theme = useTheme();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [points, setPoints] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const location = city === 'All Cities' ? null : city;

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('No authenticated user found.');
        return;
      }

      const token = await currentUser.getIdToken();

      const response = await AdminAPI.createTask(
        taskName,
        description,
        submissionDate,
        location,
        points,
        token
      );

      if (response.success) {
        const displayCity = city || 'All Cities';
        setSuccessMessage(`"${taskName}" successfully created for ${displayCity}`);
      } else {
        console.error('Task creation failed:', response.message);
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Task creation failed:', err.message);
      setSuccessMessage('');
    }

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

      {successMessage && (
        <Typography
          sx={{ mt: 3, textAlign: 'center', fontWeight: 'bold', color: 'green' }}
        >
          {successMessage}
        </Typography>
      )}
    </Box>
  );
}
