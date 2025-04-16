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
import AdminAPI from '@services/AdminApi.jsx';

export default function TaskCentral() {
  // State for fetched tasks
  const [tasks, setTasks] = useState([]);

  // Available Legacy names for filtering
  const legacyOptions = ['All', 'Vista', 'Tower', 'Bridge', 'Chronicle', 'Pulse'];
  
  // Task status options for filtering
  const statusOptions = ['All', 'Approved', 'Needs Approval', 'Not Submitted'];

  // Filter states
  const [legacyFilter, setLegacyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fetch tasks from AdminAPI whenever filters change
  useEffect(() => {
    const fetchTasks = async () => {
      const fetched = await AdminAPI.getAllTasks(legacyFilter, statusFilter);
      setTasks(fetched);
    };
    fetchTasks();
  }, [legacyFilter, statusFilter]);

  // Apply filters after tasks are fetched
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
  }, [tasks, legacyFilter, statusFilter]);

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
                  key={task.taskID} // Updated to match backend schema
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
          taskID={selectedTask.taskID}
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
