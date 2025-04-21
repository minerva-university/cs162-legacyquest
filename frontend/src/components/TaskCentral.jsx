import {
  Typography, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Stack, FormControl,
  InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import AdminTaskDetails from './AdminTaskDetails';
import AdminApi from '@services/AdminApi.jsx'; // Corrected capitalization
import { getAuth } from 'firebase/auth';

export default function TaskCentral() {
  const [tasks, setTasks] = useState([]);
  const [legacyFilter, setLegacyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [legacyOptions, setLegacyOptions] = useState([{ legacy_id: 'All', name: 'All' }]);
  const [statusOptions, setStatusOptions] = useState(['All']);

  // Maps backend enum status to user-friendly display text
  const statusLabelMap = {
    Submitted: 'Needs Approval',
    Approved: 'Approved',
    Rejected: 'Rejected',
  };

  // Fetch filtered task data from the backend
  const fetchTasks = useCallback(async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) return;
      
      const token = await user.getIdToken();
      const fetched = await AdminApi.getTasks(token); // Using getTasks instead of getAllTasks
      
      // Apply filters on the client side if needed
      let filtered = fetched;
      if (legacyFilter !== 'All') {
        filtered = filtered.filter(task => task.legacy_id === legacyFilter);
      }
      if (statusFilter !== 'All') {
        filtered = filtered.filter(task => task.status === statusFilter);
      }
      
      setTasks(filtered);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  }, [legacyFilter, statusFilter]);

  // Re-fetch tasks whenever filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Fetch all legacy groups for the filter dropdown
  useEffect(() => {
    const fetchLegacies = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) return;
        
        const token = await user.getIdToken();
        // Using proper method name and capitalization
        const response = await fetch('/api/admin/legacies', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch legacies');
        }
        
        const data = await response.json();
        setLegacyOptions([{ legacy_id: 'All', name: 'All' }, ...data]);
      } catch (error) {
        console.error('Error fetching legacies:', error);
        // Keep the default option
      }
    };
    fetchLegacies();
  }, []);

  // Fetch status options (from backend-defined enum)
  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) return;
        
        const token = await user.getIdToken();
        // Using direct API call since there's no such method in AdminApi
        const response = await fetch('/api/admin/status-options', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch status options');
        }
        
        const data = await response.json();
        setStatusOptions(['All', ...data]); // Add 'All' manually for default filter
      } catch (error) {
        console.error('Error fetching status options:', error);
        setStatusOptions(['All', 'Submitted', 'Approved', 'Rejected']); // Fallback options
      }
    };
    fetchStatusOptions();
  }, []);

  const handleLegacyFilterChange = (e) => setLegacyFilter(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    fetchTasks(); // Refresh tasks after approving or rejecting a task
  };

  return (
    <>
      <Box sx={{ p: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'white', height: '100%' }}>
        {/* Header and Filters */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">Task Central</Typography>

          <Grid container spacing={2} justifyContent="flex-end" sx={{ maxWidth: 500 }}>
            {/* Legacy Filter */}
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="legacy-filter-label">Legacy</InputLabel>
                <Select
                  labelId="legacy-filter-label"
                  value={legacyFilter}
                  label="Legacy"
                  onChange={handleLegacyFilterChange}
                >
                  {legacyOptions.map((option) => (
                    <MenuItem key={option.legacy_id} value={option.legacy_id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status Filter */}
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Task Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Task Status"
                  onChange={handleStatusFilterChange}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {statusLabelMap[option] || option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>

        {/* Tasks Table */}
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
              {tasks.map((task) => (
                <TableRow
                  key={`${task.taskID}-${task.userId}`}
                  hover
                  onClick={() => handleRowClick(task)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.legacyName}</TableCell>
                  <TableCell>{task.submissionDate || '—'}</TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabelMap[task.status] || task.status}
                      size="small"
                      sx={{
                        bgcolor:
                          task.status === 'Needs Approval' ? '#F5B041' : // Needs Approval
                          task.status === 'Approved' ? '#66BB6A' : // Green
                          '#9E9E9E', // Grey fallback
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

      {/* Task Detail Dialog */}
      {selectedTask && (
        <AdminTaskDetails
          open={detailsOpen}
          onClose={handleCloseDetails}
          taskID={selectedTask.taskID}
          submissionId={selectedTask.submissionId}
          taskName={selectedTask.taskName}
          studentName={selectedTask.studentName}
          legacyName={selectedTask.legacyName}
          submissionDate={selectedTask.submissionDate}
          needsApproval={selectedTask.status === 'Needs Approval'}
          status={selectedTask.status}
          userId={selectedTask.userId}
        />
      )}
    </>
  );
}
