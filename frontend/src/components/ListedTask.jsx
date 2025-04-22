import { Avatar, ListItem, Stack, Typography, Tooltip, Box } from '@mui/material';
import UploadEvidence from './UploadEvidence';
import TaskFeedback from './TaskFeedback';
import { useState } from 'react';
import taskIcon from '../assets/task-icon.svg';
import Fade from '@mui/material/Fade';

// Helper function to format dates properly
const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  
  try {
    // Try to parse the date string
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    
    // Format the date as Month Day, Year
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return the original string if any error occurs
  }
};

// The task listed in the task list
export default function ListedTask({taskID, taskName, taskDescription, taskStatus, dueDate, rejectionReason, onRefreshTasks, pointsOnApproval}) {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);

  // Function to get the color based on the task status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Submitted':
        return '#b71c1c'; 
      case 'Waiting Approval':
      case 'Submitted':
        return 'orange';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'gray';
    }
  }

  const handleTaskClick = () => {
    if (taskStatus === 'Rejected' || taskStatus === 'Approved' || taskStatus === 'Waiting Approval' || taskStatus === 'Submitted') {
      setOpenFeedbackDialog(true);
    } else {
      setOpenUploadDialog(true);
    }
  };

  // Format the due date for display
  const formattedDueDate = formatDate(dueDate);

  return (
    <>
      {/* Show a tooltip when the cursor hovers over the task */}
      <Tooltip title={['Rejected', 'Approved', 'Waiting Approval', 'Submitted'].includes(taskStatus) ? "Click To View Feedback" : "Click To Upload Evidence"} placement="right" arrow slotProps={{
          transition: { timeout: 5 },
        }}>
        <ListItem sx={{px: 2, py: 1, cursor: 'pointer', borderRadius: 2, overflow: 'hidden', '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }}} 
          onClick={handleTaskClick}>

          <Stack spacing={2} direction='row' sx={{alignItems: 'center', width: '100%', py: 0.5}}>
            {/* Task Avatar */}
            <Avatar 
              src={taskIcon}
              sx={{
                height: '56px',
                width: '56px',
                bgcolor: 'transparent',
                '& img': {
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }
              }} 
              variant='rounded'
            />
            
            {/* Task name, status, and due date */}
            <Stack sx={{minWidth: 0, flexGrow: 1}}>
              <Typography sx={{fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{taskName}</Typography>
              <Stack direction='row' spacing={0.5} sx={{alignItems: 'center'}}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(taskStatus),
                    flexShrink: 0
                  }}
                />              
                <Typography sx={{fontWeight: 400, fontSize: 14}}>
                  {
                    (taskStatus === 'Submitted') ? 'Waiting Approval' : taskStatus
                  }
                </Typography>
              </Stack>
            </Stack>
            
            <Typography>Due {formattedDueDate}</Typography>
          </Stack>
        </ListItem>
      </Tooltip>

      {/* Component to upload evidence and view admin feedback*/}
      <UploadEvidence 
        open={openUploadDialog} 
        onClose={() => setOpenUploadDialog(false)} 
        taskID={taskID} 
        taskName={taskName} 
        description={taskDescription}
        onSuccessfulSubmit={onRefreshTasks}
        pointsOnApproval={pointsOnApproval}
      />
      
      <TaskFeedback
        open={openFeedbackDialog}
        onClose={() => setOpenFeedbackDialog(false)}
        status={taskStatus}
        taskID={taskID}
        taskName={taskName}
        description={taskDescription}
        statusColor={getStatusColor(taskStatus)}
        onSuccessfulSubmit={onRefreshTasks}
        pointsOnApproval={pointsOnApproval}
      />
    </>
  )
}