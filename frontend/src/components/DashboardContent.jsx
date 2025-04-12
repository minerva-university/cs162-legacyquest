import { Container, Stack, Typography, useTheme, CircularProgress } from '@mui/material';
import LegacyRankingList from './LegacyRankingList';
import WelcomeCard from './WelcomeCard';
import CircleProgressTracker from './CircleProgressTracker';
import TaskList from './TaskList';
import TaskApi from '@services/TaskApi.jsx'; // Ensure path is correct
import { useEffect, useState } from 'react';
import { useAuth } from '@services/AuthContext.jsx'; // Ensure path is correct
// Import TaskModal if it's defined elsewhere
// import TaskModal from './TaskModal';

/**
 * DashboardContent Component
 * Displays the main user dashboard, including task lists, progress tracking,
 * and other relevant information. Fetches data from the backend API.
 */
export default function DashboardContent() {
  const theme = useTheme();
  // Get the Firebase ID token from the authentication context.
  // This token is required for making authenticated calls to the backend API.
  const { idToken } = useAuth();

  // --- State Variables ---
  const [tasks, setTasks] = useState([]); // Holds the list of tasks fetched from the backend (after mapping)
  const [loading, setLoading] = useState(true); // Tracks loading state for fetching tasks
  const [error, setError] = useState(null); // Stores any error message during task fetching
  const [selectedTask, setSelectedTask] = useState(null); // Holds the task data for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls visibility of the task detail modal

  /**
   * Fetches tasks from the backend API using the provided authentication token.
   * Handles loading state, error handling, and data mapping.
   * @param {string | null} token - The Firebase ID token.
   */
  const fetchTasks = async (token) => {
    // Prevent fetching if the token isn't available yet (e.g., on initial load before auth state is confirmed)
    if (!token) {
      setLoading(false); // Stop loading if no token
      // Optionally set an error or message indicating login is required
      // setError("Please log in to view tasks.");
      setTasks([]); // Ensure tasks are cleared if user logs out
      return;
    }
    setLoading(true); // Set loading true before starting the fetch
    setError(null); // Clear previous errors
    try {
      // Call the API service function, passing the token for authorization
      const fetchedTasks = await TaskApi.getAllTasks(token);

      // --- Data Mapping (IMPORTANT) ---
      // TODO: Adapt the fetchedTasks structure (from backend/Prisma)
      // to match the structure expected by child components like TaskList/TaskModal.
      // Update this mapping based on the actual backend response.
      const formattedTasks = fetchedTasks.map(task => ({
        // Example mapping:
        taskID: task.task_id,
        name: task.title,
        description: task.description || '', // Ensure description is at least an empty string
        // Determine status based on latest submission if available
        // This assumes the backend provides submissions sorted or you filter/find latest
        status: task.submissions?.length > 0
                  ? task.submissions.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))[0].status
                  : 'Not Submitted',
        dueDate: task.due_date
                  ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : 'N/A',
        // Pass through other potential fields if needed by modal/list
        points_on_approval: task.points_on_approval,
        // You might need submission details directly accessible for the modal later
        latest_submission: task.submissions?.length > 0
                  ? task.submissions.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))[0]
                  : null,
      }));

      setTasks(formattedTasks); // Update state with the formatted tasks
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(err.message || 'Failed to load tasks. Please try again.'); // Set error state
      setTasks([]); // Clear tasks on error to avoid displaying stale data
    } finally {
      setLoading(false); // Set loading false when fetch completes (success or failure)
    }
  };

  // useEffect Hook: Fetch tasks when the component mounts and whenever the idToken changes.
  // This ensures data is loaded initially and refreshed if the user logs in/out/token refreshes.
  useEffect(() => {
    fetchTasks(idToken);
  }, [idToken]);

  /**
   * Calculates the percentage of tasks marked as 'Approved'.
   * @returns {number} - The percentage (0-100).
   */
  const getCompletedPercentage = () => {
    if (tasks && tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.status === 'Approved').length;
      return Math.round((completedTasks / tasks.length) * 100);
    }
    else {
      return 0; // Default to 0% if no tasks are available
    }
  }

  /**
   * Handles opening the task detail modal.
   * Sets the selected task state.
   * TODO: Consider fetching detailed task data (evidence/comments) here if needed.
   * @param {Object} task - The task object clicked by the user.
   */
  const handleOpenModal = async (task) => {
    setSelectedTask(task); // Set the task to be displayed in the modal
    // Optional: Fetch latest evidence/comments when modal opens if not already included in mapped task
    // if (!idToken) return; // Need token
    // try {
    //   // Check if details are already present from fetchTasks mapping
    //   if (!task.evidence || !task.comments) {
    //     console.log(`Workspaceing details for task ${task.taskID}`);
    //     const [evidence, comments] = await Promise.all([
    //       TaskApi.getTaskEvidence(task.taskID, idToken),
    //       TaskApi.getTaskComments(task.taskID, idToken) // Assumes getTaskComments returns formatted string
    //     ]);
    //     setSelectedTask({ ...task, evidence, comments }); // Update selected task with details
    //   } else {
    //      setSelectedTask(task); // Use already mapped data
    //   }
    // } catch (err) {
    //    console.error("Failed to load task details for modal:", err);
    //    // Keep basic task data even if details fail
    //    setSelectedTask(task);
    // }
    setIsModalOpen(true); // Open the modal
  };

  /**
   * Handles closing the task detail modal.
   * Clears the selected task state.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  /**
   * Handles the submission of evidence from the TaskModal.
   * Calls the TaskApi service to upload the evidence.
   * Refreshes the task list on success.
   * @param {number|string} taskID - The ID of the task being submitted.
   * @param {string} evidence - The evidence text.
   * @returns {Promise<Object>} - The result object from TaskApi.uploadEvidence ({success, message}).
   */
  const handleUploadEvidence = async (taskID, evidence) => {
     // Ensure token is available before attempting upload
     if (!idToken) {
       console.error("Cannot upload evidence: No authentication token available.");
       return { success: false, message: 'Authentication error. Please log in again.' };
     }
    console.log(`Uploading evidence for task ${taskID}`);
    // Call the API service, passing the token
    const result = await TaskApi.uploadEvidence(taskID, evidence, idToken);
    // If the upload was successful according to the backend response
    if (result.success) {
      fetchTasks(idToken); // Refresh the entire task list to show updated status
      handleCloseModal(); // Close the modal automatically on success
    }
    // Return the result so the modal can display success/error feedback
    return result;
  };

  // --- Render Logic ---
  // Display loading indicator covering the whole content area initially.
  if (loading && tasks.length === 0) return ( // Show full page load only initially
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
  );
  // Display error message if fetching tasks failed initially.
  if (error && tasks.length === 0) return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
  );

  // Render the main dashboard content. Loading inside TaskList is handled separately.
  return (
    <Container sx={{mx: 'auto', py: 4}} maxWidth='lg'>
      {/* Horizontal Stack */}
      <Stack direction='row' spacing={{xs: 1, sm: 2, md: 4, lg: 8, xl: 12}} sx={{justifyContent: 'space-between'}}>
        {/* Task Tracker */}
        <Stack sx={{
          flexGrow: 3, 
          borderRadius: 2, 
          minWidth: '250px', 
          p: 4, 
          boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}` // Added spread and increased blur
        }}>
          <Typography variant='h6' sx={{fontWeight: 800, mb: 4}}>Task List</Typography>
          <Stack spacing={4} sx={{ justifyContent: 'center', alignItems: 'center'}}>
            {/* Show loading indicator inside TaskList area only if reloading */}
             {loading && tasks.length > 0 ? (
               <Stack spacing={2} sx={{width: '100%', alignItems: 'center', py: 4}}>
                 <CircularProgress color="primary" size={30} />
                 <Typography variant="body2">Refreshing tasks...</Typography>
               </Stack>
             ) : error ? (
                 <Typography color="error" variant="body2">Could not refresh tasks: {error}</Typography>
             ) : (
              <>
                <CircleProgressTracker taskProgress={getCompletedPercentage()} />
                {/* Pass tasks and the click handler to TaskList */}
                <TaskList tasks={tasks} onTaskClick={handleOpenModal} />
              </>
            )}
          </Stack>
        </Stack>

        {/* Welcome Card and legacy ranking*/}
        <Stack sx={{flexGrow: 1, alignItems: 'center'}}>
          <WelcomeCard taskCompletedPercentage={getCompletedPercentage()}/>
          <LegacyRankingList highlightedLegacy={'Vista'} /> {/* Consider making highlightedLegacy dynamic */}
        </Stack>
      </Stack>

      {/* Task Modal - Render conditionally based on isModalOpen */}
      {/* Make sure TaskModal component is imported and receives necessary props */}
      {/* Example:
      {selectedTask && (
        <TaskModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          task={selectedTask}
          onUploadEvidence={handleUploadEvidence}
          // Pass initial evidence/comments if fetched/available
          initialEvidence={selectedTask.evidence || ''}
          initialComments={selectedTask.comments || ''}
        />
      )}
      */}
    </Container>
  );
}