import { Container, Stack, Typography, useTheme, CircularProgress } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import WelcomeCard from './WelcomeCard';
import CircleProgressTracker from './CircleProgressTracker';
import TaskList from './TaskList';
import TaskApi from '@services/TaskApi.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '@services/AuthContext.jsx';

// Student's dashboard, displays task progress and legacy rankings
export default function DashboardContent() {
  const theme = useTheme();
  const { idToken } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from backend and format for display
  const fetchTasks = async (token) => {
    if (!token) {
      setLoading(false);
      setTasks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Changed method name from getAllTasks to getTasks to match the actual API method
      const fetchedTasks = await TaskApi.getTasks(token);
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err.message || 'Failed to load tasks.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when token changes (e.g., login)
  useEffect(() => {
    fetchTasks(idToken);
  }, [idToken]);

  // Calculate completion percentage based on "Approved" status
  const getCompletedPercentage = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.status === 'Approved' || t.status === 'Submitted').length;
    return Math.round((completed / tasks.length) * 100);
  };

  // Handle task selection and modal open/close
  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Handle evidence upload and refresh task list after
  const handleUploadEvidence = async (taskID, evidence) => {
    if (!idToken) return { success: false, message: 'Authentication error.' };
    try {
      const result = await TaskApi.uploadEvidence(taskID, evidence, idToken);
      if (result.success) {
        fetchTasks(idToken);
        handleCloseModal();
      }
      return result;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Full-page loading indicator (initial load)
  if (loading && tasks.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Error message if no tasks and fetch fails
  if (error && tasks.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  // Main dashboard content layout
  return (
    <Container sx={{ mx: 'auto', py: 4 }} maxWidth='lg'>
      <Stack direction='row' spacing={{ xs: 1, sm: 2, md: 4, lg: 8, xl: 12 }} sx={{ justifyContent: 'space-between' }}>

        {/* Task Progress Panel */}
        <Stack sx={{ flexGrow: 3, borderRadius: 2, minWidth: '400px', p: 4, boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}` }}>
          <Typography variant='h6' sx={{ fontWeight: 800, mb: 4 }}>Task List</Typography>
          <Stack spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            {loading && tasks.length > 0 ? (
              <Stack spacing={2} sx={{ width: '100%', alignItems: 'center', py: 4 }}>
                <CircularProgress color="primary" size={30} />
                <Typography variant="body2">Refreshing tasks...</Typography>
              </Stack>
            ) : error ? (
              <Typography color="error" variant="body2">Could not refresh tasks: {error}</Typography>
            ) : (
              <>
                <CircleProgressTracker taskProgress={getCompletedPercentage()} />
                <TaskList tasks={tasks} onRefreshTasks={() => fetchTasks(idToken)} />
              </>
            )}
          </Stack>
        </Stack>

        {/* Welcome Card + Legacy Rankings */}
        <Stack sx={{ flexGrow: 1, alignItems: 'center' }}>
          <WelcomeCard taskCompletedPercentage={getCompletedPercentage()} />
          <LegacyRankingList/>
        </Stack>
        
      </Stack>
    </Container>
  );
}