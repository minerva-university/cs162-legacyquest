import { Box, Typography, TextField, Button, InputAdornment, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';

export default function AddNewTask() {
  const theme = useTheme();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would add the task to the database
    // All tasks need approval by default
    console.log({ taskName, description, city, submissionDate, needsApproval: true });
    
    // Reset form
    setTaskName('');
    setDescription('');
    setCity('');
    setSubmissionDate('');
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          cursor: 'pointer'
        }}
        onClick={handleToggleExpand}
      >
        <CheckCircleIcon sx={{ color: '#1976d2', mr: 1 }} />
        Add New Task
      </Typography>
      
      {expanded && (
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
            
            <TextField
              placeholder="Which city it should display for?"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  bgcolor: '#f5f5f5'
                }
              }}
            />
            
            <TextField
              placeholder="Submission Deadline..."
              variant="outlined"
              fullWidth
              required
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  bgcolor: '#f5f5f5'
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
      )}
    </Box>
  );
}