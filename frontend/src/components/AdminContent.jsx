import { Container, Card, Box, Stack, Typography } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';

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
    <Container sx={{mx: 'auto', py: 6}} maxWidth='lg'>
      {/* Horizontal Stack */}
      <Stack direction='row' spacing={2} sx={{justifyContent: 'space-between'}}>

        <Card sx={{flexGrow: 4, minWidth: '250px', p: 4}}>
          <Typography variant='h6' sx={{fontWeight: 800}}>Task Central</Typography>
          {/* Use the above dummy data to implement Task Central below */}
          
        </Card>
        

        {/* Legacy ranking*/}
        <Box sx={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LegacyRankingList />
        </Box>
      </Stack>
    </Container>
  );
}