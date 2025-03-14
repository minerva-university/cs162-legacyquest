import { Box, Divider, Stack } from '@mui/material';
import AdminContent from '../components/AdminContent';
import UserProfile from '../components/UserProfile';

export default function AdminPage() {
  return(
    <Stack direction='row' sx={{ height: '100%', alignItems: 'stretch'}}>
      <Box sx={{flexGrow: 10}}>
        <AdminContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>

      {/* User Profile on the right */}
      <Box sx={{flexGrow: 0.5}}>
        <UserProfile isAdmin={true} />
      </Box>
  </Stack>
  )
}