import { CircularProgress, Stack, Paper, Box, Typography } from '@mui/material';
import TaskList from './TaskList';

export default function TaskTracker() {
  const taskProgress = 82;
  const displayedProgress = taskProgress < 100 ? Math.min(96, Math.max(0.1, taskProgress)) : 100;

  return (
    <Stack direction='row' spacing={{xs: 2, lg: 4}} sx={{alignItems: 'stretch'}}>
      <Box sx={{width: '50%'}}>
        <TaskList />
      </Box>
      <Box sx={{width: '50%'}}>
        <Paper sx={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', p: 2, height: '100%', boxSizing: 'border-box', borderRadius: 2}}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant='determinate' size={160} thickness={4} value={100} sx={{color: '#CEAC674D'}} />
          <CircularProgress variant='determinate' size={160} thickness={4} value={displayedProgress} sx={{position: 'absolute', left: 0, color: '#D98F41', strokeLinecap: 'round'}} />
          <Box sx={{top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant='h2'>{taskProgress}</Typography>
          </Box>
        </Box>
        <Typography sx={{textAlign: 'center', pt: 4}}>You have completed <span style={{fontWeight: 800, color: '#CC6A02'}}>{taskProgress}% of your task list. Keep it up!</span>
        </Typography>
        </Paper>
      </Box>
    </Stack>
  )
}