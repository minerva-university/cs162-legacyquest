import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Paper, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../backend/authService';
import { useAuth } from '../backend/AuthContext';

export default function AdminDashboardPage() {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect if not an admin (this is a backup to the ProtectedRoute)
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      navigate('/sign-up');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h3" color="primary">
            Admin Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
            disabled={loading}
          >
            Logout
          </Button>
        </Stack>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Welcome, Admin!
          </Typography>
          <Typography variant="body1">
            You are logged in as: {currentUser?.email}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="h5" gutterBottom>
            Admin Controls
          </Typography>
          <Typography variant="body1" paragraph>
            This is a special admin interface with privileged access. Here you can manage users, view analytics, and perform administrative tasks.
          </Typography>
          
          {/* Admin-specific features would go here */}
          <Stack spacing={2} mt={3}>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6">User Management</Typography>
              <Typography variant="body2">Manage user accounts and permissions</Typography>
            </Paper>
            
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6">System Analytics</Typography>
              <Typography variant="body2">View system usage statistics and reports</Typography>
            </Paper>
            
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6">Content Management</Typography>
              <Typography variant="body2">Manage application content and settings</Typography>
            </Paper>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
} 