import { Container, Card, Box, Stack, Typography } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import WelcomeCard from './WelcomeCard';
import CircleProgressTracker from './CircleProgressTracker';
import TaskList from './TaskList';

export default function DashboardContent() {
  return (
    <Container sx={{mx: 'auto', py: 6}} maxWidth='lg'>
      {/* Horizontal Stack */}
      <Stack direction='row' spacing={12} sx={{justifyContent: 'space-between'}}>
        {/* Task Tracker */}
        <Card sx={{flexGrow: 3, minWidth: '250px', p: 4}}>
          <Typography variant='h6' sx={{fontWeight: 800, mb: 4}}>Task List</Typography>
          <Stack spacing={4} sx={{ justifyContent: 'center', alignItems: 'center'}}>
            <CircleProgressTracker taskProgress={82} />
            <TaskList />
          </Stack>
        </Card>

        {/* Welcome Card and legacy ranking*/}
        <Box sx={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <WelcomeCard taskCompletedPercentage={50}/>
          <LegacyRankingList />
        </Box>
      </Stack>
    </Container>
  );
}