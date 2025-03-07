import { Avatar, ListItem, Stack, Typography, Box } from '@mui/material';

export default function ListedUser({userName, userXP}) {
  return (
    <ListItem sx={{px: 2, py: 0.5}}>
      <Stack spacing={1} direction='row' sx={{alignItems: 'center', width: 1}}>
        <Avatar src='https://mui.com/static/images/avatar/1.jpg' />
        <Typography sx={{fontWeight: 600}}>{userName}</Typography>
        <Box sx={{flexGrow: 1}}></Box>
        <Typography sx={{fontWeight: 400}}>{userXP} XP</Typography>
      </Stack>
    </ListItem>
  )
}