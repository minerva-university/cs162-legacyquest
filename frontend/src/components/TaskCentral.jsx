import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function TaskCentral() {
  // dummy data
  const tasks = [
    {id: 1, taskName: 'Task 1', submissionDate: '2025/01/01', needsApproval: true},
    {id: 2, taskName: 'Task 2', submissionDate: '2025/01/02', needsApproval: false},
    {id: 3, taskName: 'Task 3', submissionDate: '2025/01/03', needsApproval: true},
    {id: 4, taskName: 'Task 4', submissionDate: '2025/01/04', needsApproval: false},
    {id: 5, taskName: 'Task 5', submissionDate: '2025/01/05', needsApproval: true},
    {id: 6, taskName: 'Task 6', submissionDate: '2025/01/06', needsApproval: false},
  ];

  return (
    // We can remove the border once the task central is implemented
    <Box sx={{border: 1}}>
      <Typography>Task Central</Typography>
      
    </Box>
  );
}