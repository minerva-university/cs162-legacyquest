import { Box, Divider, Stack } from '@mui/material';
import UserProfile from '../components/UserProfile';
import DashboardContent from '../components/DashboardContent';

export default function DashboardPage() {
  return (
    <Stack direction='row' sx={{ height: '100%', alignItems: 'stretch'}}>
      <Box sx={{flexGrow: 1}}>
        <DashboardContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>
      <Box sx={{flexGrow: 1}}>
        <UserProfile isAdmin={false}/>
      </Box>
    </Stack>
  );
}