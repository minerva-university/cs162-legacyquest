import { Avatar, ListItem, Stack, Typography, Box } from '@mui/material';

// The user listed in the legacy ranking list
export default function ListedUser({userName, cohort, location, avatarUrl}) {
  return (
    <ListItem sx={{px: 2, py: 0.5}}>
      <Stack spacing={1} direction='row' sx={{alignItems: 'center', width: 1}}>
        <Avatar src={avatarUrl} />
        <Typography sx={{fontWeight: 600}}>{userName}</Typography>
        <Box sx={{flexGrow: 1}}></Box>
        <Typography sx={{fontWeight: 400}}>{cohort}</Typography>
      </Stack>
    </ListItem>
  )
}