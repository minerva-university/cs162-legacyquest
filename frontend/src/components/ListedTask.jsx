import { Avatar, ListItem, Stack, Typography, Tooltip } from '@mui/material';
import UploadEvidence from './UploadEvidence';
import { useState } from 'react';
import taskIcon from '../assets/task-icon.svg';

export default function ListedTask({taskName}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Tooltip title="Upload Evidence" placement="right" arrow>
        <ListItem sx={{px: 2, py: 1, cursor: 'pointer', borderRadius: 2, overflow: 'hidden', '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }}} 
          onClick={() => setOpenDialog(true)}>

          <Stack spacing={2} direction='row' sx={{alignItems: 'center', width: 1}}>
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
            
            <Stack sx={{width: 1, alignItems: 'stretch'}}>
              <Typography sx={{fontWeight: 600}}>{taskName}</Typography>
            </Stack>
          </Stack>
        </ListItem>
      </Tooltip>

      <UploadEvidence open={openDialog} onClose={() => setOpenDialog(false)} taskName={taskName}/>
    </>
  )
}