import { Box, Divider, Stack } from '@mui/material';
import UserProfile from '../components/UserProfile';
import DashboardContent from '../components/DashboardContent';

export default function DashboardPage() {
  return (
    <Stack 
      direction='row' 
      sx={{ 
        height: '100vh', // Changed from 100% to 100vh
        width: '100%',
        alignItems: 'stretch',
        overflow: 'hidden'
      }}
    >
      <Box sx={{
        flexGrow: 1,
        overflow: 'auto'
      }}>
        <DashboardContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>
      <Box sx={{
        flexGrow: 0.5,
        overflow: 'auto'
      }}>
        <UserProfile isAdmin={false}/>
      </Box>
    </Stack>
  );
}