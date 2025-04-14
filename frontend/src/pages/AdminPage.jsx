import { Box, Divider, Stack } from '@mui/material';
import UserProfile from '../components/UserProfile';
import AdminContent from '../components/AdminContent';

export default function AdminPage() {
  return (
    <Stack 
      direction='row' 
      sx={{ 
        height: '100vh',
        width: '100%',
        alignItems: 'stretch',
        overflow: 'hidden'
      }}
    >
      <Box sx={{
        flexGrow: 1,
        overflow: 'auto'
      }}>
        <AdminContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>
      <Box sx={{
        flexGrow: 0.5,
        overflow: 'auto'
      }}>
        <UserProfile isAdmin={true}/>
      </Box>
    </Stack>
  );
}