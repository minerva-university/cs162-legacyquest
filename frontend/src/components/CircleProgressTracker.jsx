import { Box, CircularProgress, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// A simple progress tracker component that displays a circular progress bar and a message indicating the percentage of tasks completed.
export default function CircleProgressTracker({taskProgress}) {
  const theme = useTheme();
  const displayedProgress = taskProgress < 100 ? Math.min(96, Math.max(0.1, taskProgress)) : 100;
  
  return (
    <Box sx={{
      height: '90%',
      width: '40%',
      minWidth: '240px',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      p: 2,
      boxSizing: 'border-box',
      boxShadow: `0 0 5px 0.5px ${theme.palette.shadowGray}`}}>
        
      {/* Circular progress bar */}
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant='determinate' size={130} thickness={4} value={100} sx={{color: '#CEAC674D'}} />
        <CircularProgress variant='determinate' size={130} thickness={4} value={displayedProgress} sx={{position: 'absolute', left: 0, color: '#D98F41', strokeLinecap: 'round'}} />
        <Box sx={{top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant='h2'>{taskProgress}</Typography>
        </Box>
      </Box>

      {/* Text, displays the percentage of tasks completed */}
      <Typography sx={{textAlign: 'center', pt: 4}}>You have completed <span style={{fontWeight: 800, color: '#CC6A02'}}>{taskProgress}% of your task list. Keep it up!</span>
      </Typography>
    </Box>
  )
}