import { Container, Card, Box, Stack, Typography, Paper } from '@mui/material';
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      p: 2,
      gap: 3
    }}>
      {/* Task Central */}
      <Paper 
        elevation={1} 
        sx={{
          width: '58%',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'white'
        }}
      >
        <TaskCentral />
      </Paper>

      {/* Legacy ranking*/}
      <Paper 
        elevation={1} 
        sx={{
          width: '42%',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'white'
        }}
      >
        <LegacyRankingList />
      </Paper>
    </Box>
  );
}