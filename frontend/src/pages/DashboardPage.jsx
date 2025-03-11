import { Box, Divider, Stack } from '@mui/material';
import UserProfile from '../components/UserProfile';
import DashboardContent from '../components/DashboardContent';
import { useAuth } from '../backend/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { currentUser, userRole, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect admin to admin dashboard
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  return (
    <Stack direction='row' sx={{ height: '100%', alignItems: 'stretch'}}>
      <Box sx={{flexGrow: 10}}>
        <DashboardContent />
      </Box>
      <Divider orientation='vertical' flexItem sx={{borderWidth: 1}}/>
      <Box sx={{flexGrow: 1}}>
        <UserProfile 
          email={currentUser?.email} 
          role={userRole} 
        />
      </Box>
    </Stack>
  );
}