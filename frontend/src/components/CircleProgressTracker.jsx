import { Box, CircularProgress, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TaskApi from '../../backend/TaskApi';

export default function CircleProgressTracker({taskProgress}) {
  const theme = useTheme();
  const displayedProgress = taskProgress < 100 ? Math.min(96, Math.max(0.1, taskProgress)) : 100;
  
  return (
    <Box sx={{
      height: '100%',
      width: '50%',
      minWidth: '240px',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      p: 2,
      boxSizing: 'border-box',
      boxShadow: `0 0 6px ${theme.palette.shadowGreen}`}}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant='determinate' size={160} thickness={4} value={100} sx={{color: '#CEAC674D'}} />
        <CircularProgress variant='determinate' size={160} thickness={4} value={displayedProgress} sx={{position: 'absolute', left: 0, color: '#D98F41', strokeLinecap: 'round'}} />
        <Box sx={{top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant='h2'>{taskProgress}</Typography>
        </Box>
      </Box>
      <Typography sx={{textAlign: 'center', pt: 4}}>You have completed <span style={{fontWeight: 800, color: '#CC6A02'}}>{taskProgress}% of your task list. Keep it up!</span>
      </Typography>
    </Box>
  )
}