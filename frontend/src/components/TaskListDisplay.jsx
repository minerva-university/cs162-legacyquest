import { Avatar, ListItem, Stack, Typography, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function TaskListDisplay({taskName, currentProgress, targetProgress}) {
  return (
    <ListItem sx={{px: 2, py: 1}}>
      <Stack spacing={1} direction='row' sx={{alignItems: 'center', width: 1}}>
        <Avatar sx={{bgcolor: 'green'}} variant='rounded'>
          <AssignmentIcon />
        </Avatar>
        <Typography sx={{fontWeight: 600}}>{taskName}</Typography>
        <Box sx={{flexGrow: 1}}></Box>
        <Typography sx={{fontWeight: 400}}>{currentProgress}/{targetProgress}</Typography>
      </Stack>
    </ListItem>
  )
}