import { Avatar, ListItem, Stack, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinearProgress from './LinearProgress';

export default function ListedTask({taskName, currentProgress, targetProgress}) {
  return (
    <ListItem sx={{px: 2, py: 1}}>
      <Stack spacing={2} direction='row' sx={{alignItems: 'center', width: 1}}>
        {/* Task Avatar */}
        <Avatar sx={{bgcolor: 'green', height: '48px'}} variant='rounded'>
          <AssignmentIcon />
        </Avatar>
        
        <Stack sx={{width: 1, alignItems: 'stretch'}}>
          <Typography sx={{fontWeight: 600}}>{taskName}</Typography>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <LinearProgress
            value={currentProgress / targetProgress * 100}
            height={16}
            barStartColor={'#FF9600'}
            barEndColor={'#FFC800'}
            backgroundColor='#E0E0E0'
            borderRadius={4} />
            <Typography sx={{fontWeight: 400, fontSize: 14, width: '50px', textAlign: 'center'}}>{currentProgress}/{targetProgress}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  )
}