import { Container, Stack, useTheme } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import TaskCentral from './TaskCentral';
import WelcomeCard from './WelcomeCard';

export default function AdminContent() {
  const theme = useTheme();
  
  // Main dashboard content layout - exact copy of student dashboard structure
  return (
    <Container sx={{ mx: 'auto', py: 4 }} maxWidth='lg'>
      <Stack direction='row' spacing={{ xs: 1, sm: 2, md: 4, lg: 8, xl: 12 }} sx={{ justifyContent: 'space-between' }}>
        {/* Task Central Panel */}
        <Stack sx={{ 
          flexGrow: 3, 
          borderRadius: 2, 
          minWidth: '250px', 
          overflow: 'hidden',
          boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}`,
          bgcolor: 'white'
        }}>
          <TaskCentral />
        </Stack>

        {/* Legacy Rankings */}
        <Stack sx={{ flexGrow: 1, alignItems: 'center' }}>
          {/* WelcomeCard without container - matches student dashboard exactly */}
          <WelcomeCard taskCompletedPercentage={100} />
          
          {/* Legacy Ranking List */}
          <LegacyRankingList />
        </Stack>
      </Stack>
    </Container>
  );
}