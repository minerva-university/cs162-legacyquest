import { Container, Stack, Typography, useTheme } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import WelcomeCard from './WelcomeCard';
import CircleProgressTracker from './CircleProgressTracker';
import TaskList from './TaskList';

export default function DashboardContent() {
  const theme = useTheme();

  return (
    <Container sx={{mx: 'auto', py: 4}} maxWidth='lg'>
      {/* Horizontal Stack */}
      <Stack direction='row' spacing={{xs: 1, sm: 2, md: 4, lg: 8, xl: 12}} sx={{justifyContent: 'space-between'}}>
        {/* Task Tracker */}
        <Stack sx={{flexGrow: 3, borderRadius: 2, minWidth: '250px', p: 4, boxShadow: `0 0 6px ${theme.palette.shadowGreen}`}}>
          <Typography variant='h6' sx={{fontWeight: 800, mb: 4}}>Task List</Typography>
          <Stack spacing={4} sx={{ justifyContent: 'center', alignItems: 'center'}}>
            <CircleProgressTracker taskProgress={82} />
            <TaskList />
          </Stack>
        </Stack>

        {/* Welcome Card and legacy ranking*/}
        <Stack sx={{flexGrow: 1, alignItems: 'center'}}>
          <WelcomeCard taskCompletedPercentage={50}/>
          <LegacyRankingList highlightedLegacy={'Vista'} />
        </Stack>

      </Stack>
    </Container>
  );
}