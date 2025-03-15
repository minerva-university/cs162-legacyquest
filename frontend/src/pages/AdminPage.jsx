import { Box, Divider, Stack } from '@mui/material';
import AdminContent from '../components/AdminContent';
import UserProfile from '../components/UserProfile';

export default function AdminPage() {
  return(
    <Stack direction='row' sx={{ height: '100%', alignItems: 'stretch'}}>
      <Box sx={{
        flexGrow: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        pr: 0
      }}>
        <AdminContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>

      {/* User Profile on the right */}
      <Box sx={{
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 4,
        pt: 3,
        pl: 3,
        bgcolor: '#f9f9f9',
        maxWidth: '350px',
        overflow: 'auto'
      }}>
        <UserProfile isAdmin={true} />
      </Box>
    </Stack>
  )
}