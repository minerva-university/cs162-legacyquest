import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useState } from 'react';

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

  const [filter, setFilter] = useState('legacy');

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const handleApprove = (id) => {
    console.log(`Approved task ${id}`);
    // In a real app, this would update the task status
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'white', height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">Task Central</Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="task filter"
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              mx: 0.5,
              px: 2,
              py: 0.5,
              textTransform: 'none',
              '&.Mui-selected': {
                bgcolor: '#f5f5f5',
                color: 'text.primary',
                fontWeight: 'medium',
              }
            }
          }}
        >
          <ToggleButton value="legacy" aria-label="legacy">
            Legacy
          </ToggleButton>
          <ToggleButton value="rotation-city" aria-label="rotation city">
            Rotation City
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><Typography fontWeight="bold">Task Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Submission Date</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} hover>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.submissionDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={task.needsApproval ? "Needs Approval" : "Approved"} 
                    size="small"
                    sx={{
                      bgcolor: task.needsApproval ? '#ff9800' : '#4caf50',
                      color: 'white',
                      borderRadius: '16px',
                      fontWeight: 'medium',
                      px: 1
                    }}
                  />
                </TableCell>
                <TableCell>
                  {task.needsApproval && (
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderRadius: '4px',
                        color: '#1976d2',
                        fontWeight: 'bold',
                        borderColor: '#1976d2',
                        '&:hover': {
                          borderColor: '#1565c0',
                          bgcolor: 'rgba(25, 118, 210, 0.04)'
                        }
                      }}
                      onClick={() => handleApprove(task.id)}
                    >
                      APPROVE
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}