import { Avatar, ListItem, Stack, Typography, Tooltip, Box } from '@mui/material';
import UploadEvidence from './UploadEvidence';
import TaskFeedback from './TaskFeedback';
import { useState } from 'react';
import taskIcon from '../assets/task-icon.svg';
import Fade from '@mui/material/Fade';

export default function ListedTask({taskID, taskName, taskDescription, taskStatus, dueDate, rejectionReason}) {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Submitted':
        // return dark red
        return '#b71c1c'; 
      case 'Waiting Approval':
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
    if (taskStatus === 'Rejected' || taskStatus === 'Approved' || taskStatus === 'Waiting Approval') {
      setOpenFeedbackDialog(true);
    } else {
      setOpenUploadDialog(true);
    }
  };

  return (
    <>
      <Tooltip title={taskStatus === 'Rejected' ? "Click To View Feedback" : "Click To Upload Evidence"} placement="right" arrow slotProps={{
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
                <Typography sx={{fontWeight: 400, fontSize: 14}}>{taskStatus}</Typography>
              </Stack>
            </Stack>
            
            <Typography>Due {dueDate}</Typography>
          </Stack>
        </ListItem>
      </Tooltip>

      <UploadEvidence 
        open={openUploadDialog} 
        onClose={() => setOpenUploadDialog(false)} 
        taskID={taskID} 
        taskName={taskName} 
        description={taskDescription}
      />
      
      <TaskFeedback
        open={openFeedbackDialog}
        onClose={() => setOpenFeedbackDialog(false)}
        status={taskStatus}
        taskID={taskID}
        taskName={taskName}
        description={taskDescription}
        statusColor={getStatusColor(taskStatus)}
      />
    </>
  )
}