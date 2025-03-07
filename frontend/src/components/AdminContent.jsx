import { Container, Card, Box, Stack, Typography } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import TaskCentral from './TaskCentral';

export default function AdminContent() {
  const taskData = [
    {name: 'Task 1', submissionDate: '2021-10-01', isWaitingApproval: false},
    {name: 'Task 2', submissionDate: '2021-10-02', isWaitingApproval: true},
    {name: 'Task 3', submissionDate: '2021-10-03', isWaitingApproval: false},
    {name: 'Task 4', submissionDate: '2021-10-04', isWaitingApproval: true},
    {name: 'Task 5', submissionDate: '2021-10-05', isWaitingApproval: false},
    {name: 'Task 6', submissionDate: '2021-10-06', isWaitingApproval: false},
  ];

  return (
    <Container sx={{mx: 'auto', py: 4}} maxWidth='lg'>
      {/* Horizontal Stack */}
      <Stack direction='row' spacing={2} sx={{justifyContent: 'space-between'}}>
        {/* Task Central */}
        <Box sx={{flexGrow: 3, justifyContent: 'center', alignItems: 'center'}}>
          <TaskCentral />
        </Box>

        {/* Legacy ranking*/}
        <Box sx={{justifyContent: 'center', alignItems: 'center'}}>
          <LegacyRankingList />
        </Box>
        
      </Stack>
    </Container>
  );
}