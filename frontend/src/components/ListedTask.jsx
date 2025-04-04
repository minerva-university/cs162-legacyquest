import { Avatar, ListItem, Stack, Typography, Tooltip } from '@mui/material';
import UploadEvidence from './UploadEvidence';
import { useState } from 'react';
import taskIcon from '../assets/task-icon.svg';

export default function ListedTask({taskName, taskDescription, taskStatus}) {
  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <>
      <Tooltip title="Upload Evidence" placement="right" arrow>
        <ListItem sx={{px: 2, py: 1, cursor: 'pointer', borderRadius: 2, overflow: 'hidden', '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }}} 
          onClick={() => setOpenDialog(true)}>

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
            
            <Stack sx={{minWidth: 0, flexGrow: 1, overflow: 'hidden'}}>
              <Typography sx={{fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{taskName}</Typography>
              <Typography sx={{fontSize: 12, color: 'gray', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{taskDescription}</Typography>
            </Stack>
            
            <Typography sx={{fontWeight: 400, fontSize: 14, width: '60px', textAlign: 'center'}}>{taskStatus}</Typography>
          </Stack>
        </ListItem>
      </Tooltip>

      <UploadEvidence open={openDialog} onClose={() => setOpenDialog(false)} taskName={taskName}/>
    </>
  )
}