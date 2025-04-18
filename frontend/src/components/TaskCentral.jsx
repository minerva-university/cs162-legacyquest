import {
  Typography, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Stack, FormControl,
  InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import AdminTaskDetails from './AdminTaskDetails';
import AdminAPI from '@services/AdminApi.jsx';

export default function TaskCentral() {
  const [tasks, setTasks] = useState([]);
  const [legacyFilter, setLegacyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const legacyOptions = ['All', 'Vista', 'Tower', 'Bridge', 'Chronicle', 'Pulse'];
  const statusOptions = ['All', 'Approved', 'Needs Approval', 'Not Submitted'];

  const fetchTasks = useCallback(async () => {
    const fetched = await AdminAPI.getAllTasks(legacyFilter, statusFilter);
    setTasks(fetched);
  }, [legacyFilter, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleLegacyFilterChange = (e) => setLegacyFilter(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    fetchTasks(); // Refresh after approval/rejection
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
                      label={task.status}
                      size="small"
                      sx={{
                        bgcolor:
                          task.status === 'Needs Approval' ? '#F5B041' :
                          task.status === 'Approved' ? '#66BB6A' :
                          '#9E9E9E',
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

      {/* Dialog */}
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
          userId={selectedTask.userId}
        />
      )}
    </>
  );
}
