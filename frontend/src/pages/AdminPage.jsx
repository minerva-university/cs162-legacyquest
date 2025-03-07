import { Box, Divider, Stack } from '@mui/material';
import AdminProfile from '../components/AdminProfile';
import AdminContent from '../components/AdminContent';

export default function AdminPage() {
  return(
    <Stack direction='row' sx={{ height: '100%', alignItems: 'stretch'}}>
      <Box sx={{flexGrow: 10}}>
        <AdminContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>

      {/* User Profile on the right */}
      <Box sx={{flexGrow: 1}}>
        <AdminProfile />
      </Box>
  </Stack>
  )
}