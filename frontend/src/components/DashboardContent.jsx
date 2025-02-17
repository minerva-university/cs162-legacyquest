import { Container, Typography, Box, Stack } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import WelcomeCard from './WelcomeCard';
import TaskTracker from './TaskTracker';

export default function DashboardContent() {
  return (
    <Container sx={{mx: 'auto'}} maxWidth='lg'>
      <Typography variant='h1' sx={{fontFamily: 'Potta One, cursive', color: '#CC6A02', fontWeight: 500, mt: 6}}>LEGACY</Typography>
      <Stack direction={{xs: 'column', lg: 'row'}} spacing={{xs: 2, lg: 4}} sx={{justifyContent: 'space-between'}}>
        <Box sx={{flexGrow: 1}}>
          <WelcomeCard taskCompletedPercentage={50}/>
          <TaskTracker />
        </Box>
        <Box sx={{flexGrow: 1, minWidth: '250px'}}>
          <LegacyRankingList />
        </Box>
      </Stack>
    </Container>
  );
}