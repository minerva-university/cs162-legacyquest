import { Container, Stack, Typography, useTheme, CircularProgress } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import WelcomeCard from './WelcomeCard';
import CircleProgressTracker from './CircleProgressTracker';
import TaskList from './TaskList';
import TaskApi from '@services/TaskApi.jsx';
import { useEffect, useState } from 'react';

export default function DashboardContent() {
  const theme = useTheme();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await TaskApi.getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  const getCompletedPercentage = () => {
    if (tasks && tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.status === 'Approved').length;
      return Math.round((completedTasks / tasks.length) * 100);
    }
    else {
      return 0; // Default to 0% if no tasks are available
    }
  }

  return (
    <Container sx={{mx: 'auto', py: 4}} maxWidth='lg'>
      {/* Horizontal Stack */}
      <Stack direction='row' spacing={{xs: 1, sm: 2, md: 4, lg: 8, xl: 12}} sx={{justifyContent: 'space-between'}}>
        {/* Task Tracker */}
        <Stack sx={{
          flexGrow: 3, 
          borderRadius: 2, 
          minWidth: '250px', 
          p: 4, 
          boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}` // Added spread and increased blur
        }}>
          <Typography variant='h6' sx={{fontWeight: 800, mb: 4}}>Task List</Typography>
          <Stack spacing={4} sx={{ justifyContent: 'center', alignItems: 'center'}}>
            {isLoading ? (
              <Stack spacing={2} sx={{width: '100%', alignItems: 'center', py: 4}}>
                <CircularProgress color="primary" />
                <Typography variant="body1">Loading tasks...</Typography>
              </Stack>
            ) : (
              <>
                <CircleProgressTracker taskProgress={getCompletedPercentage()} />
                <TaskList tasks={tasks}/>
              </>
            )}
          </Stack>
        </Stack>

        {/* Welcome Card and legacy ranking*/}
        <Stack sx={{flexGrow: 1, alignItems: 'center'}}>
          <WelcomeCard taskCompletedPercentage={getCompletedPercentage()}/>
          <LegacyRankingList highlightedLegacy={'Vista'} />
        </Stack>
      </Stack>
    </Container>
  );
}