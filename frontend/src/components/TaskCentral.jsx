import { 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Stack, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import AdminTaskDetails from './AdminTaskDetails';

export default function TaskCentral() {
  // Available Legacy names for filtering
  const legacyOptions = ['All', 'Vista', 'Tower', 'Bridge', 'Chronicle', 'Pulse'];
  
  // Task status options for filtering
  const statusOptions = ['All', 'Approved', 'Needs Approval', 'Not Submitted'];
  
  // dummy data
  const tasks = [
    {id: 1, taskName: 'Task 1', submissionDate: '2025/01/01', needsApproval: true, studentName: 'Alice Chen', legacyName: 'Vista', status: 'Needs Approval'},
    {id: 2, taskName: 'Task 2', submissionDate: '2025/01/02', needsApproval: false, studentName: 'Bob Johnson', legacyName: 'Tower', status: 'Approved'},
    {id: 3, taskName: 'Task 3', submissionDate: '2025/01/03', needsApproval: true, studentName: 'Carlos Rodriguez', legacyName: 'Bridge', status: 'Needs Approval'},
    {id: 4, taskName: 'Task 4', submissionDate: '2025/01/04', needsApproval: false, studentName: 'Diana Kim', legacyName: 'Chronicle', status: 'Approved'},
    {id: 5, taskName: 'Task 5', submissionDate: '2025/01/05', needsApproval: true, studentName: 'Elijah Williams', legacyName: 'Vista', status: 'Needs Approval'},
    {id: 6, taskName: 'Task 6', submissionDate: '2025/01/06', needsApproval: false, studentName: 'Fatima Hassan', legacyName: 'Pulse', status: 'Approved'},
    {id: 7, taskName: 'Task 7', submissionDate: '', needsApproval: false, studentName: 'George Smith', legacyName: 'Tower', status: 'Not Submitted'},
  ];

  // Filter states
  const [legacyFilter, setLegacyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...tasks];
    
    // Apply legacy filter
    if (legacyFilter !== 'All') {
      result = result.filter(task => task.legacyName === legacyFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    setFilteredTasks(result);
  }, [legacyFilter, statusFilter]);

  const handleLegacyFilterChange = (event) => {
    setLegacyFilter(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      <Box sx={{ p: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'white', height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">Task Central</Typography>
          
          <Grid container spacing={2} justifyContent="flex-end" sx={{ maxWidth: 500 }}>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="legacy-filter-label">Legacy</InputLabel>
                <Select
                  labelId="legacy-filter-label"
                  id="legacy-filter"
                  value={legacyFilter}
                  label="Legacy"
                  onChange={handleLegacyFilterChange}
                >
                  {legacyOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Task Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Task Status"
                  onChange={handleStatusFilterChange}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>

        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><Typography fontWeight="bold">Task Name</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Legacy</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Submission Date</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow 
                  key={task.id} 
                  hover
                  onClick={() => handleRowClick(task)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.legacyName}</TableCell>
                  <TableCell>{task.submissionDate || '—'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={task.status} 
                      size="small"
                      sx={{
                        bgcolor: 
                          task.status === 'Needs Approval' ? '#F5B041' : 
                          task.status === 'Approved' ? '#66BB6A' : 
                          '#9E9E9E', // gray for Not Submitted
                        color: 'white',
                        borderRadius: '16px',
                        fontWeight: 'medium',
                        px: 1
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Task Details Dialog */}
      {selectedTask && (
        <AdminTaskDetails
          open={detailsOpen}
          onClose={handleCloseDetails}
          taskID={selectedTask.id}
          taskName={selectedTask.taskName}
          studentName={selectedTask.studentName}
          legacyName={selectedTask.legacyName}
          submissionDate={selectedTask.submissionDate}
          needsApproval={selectedTask.status === 'Needs Approval'}
        />
      )}
    </>
  );
}