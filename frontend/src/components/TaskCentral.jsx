import {
  Typography, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Stack, FormControl,
  InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import AdminTaskDetails from './AdminTaskDetails';
import AdminAPI from '@services/AdminApi.jsx';
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
    const fetched = await AdminAPI.getAllTasks(legacyFilter, statusFilter);
    setTasks(fetched);
  }, [legacyFilter, statusFilter]);

  // Re-fetch tasks whenever filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Fetch all legacy groups for the filter dropdown
  useEffect(() => {
    const fetchLegacies = async () => {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();
      const data = await AdminAPI.getAllLegacies(token);
      setLegacyOptions([{ legacy_id: 'All', name: 'All' }, ...data]);
    };
    fetchLegacies();
  }, []);

  // Fetch status options (from backend-defined enum)
  useEffect(() => {
    const fetchStatusOptions = async () => {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();
      const data = await AdminAPI.getStatusOptions(token);
      setStatusOptions(['All', ...data]); // Add 'All' manually for default filter
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
                  <MenuItem key={option.name} value={option.name}>
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
