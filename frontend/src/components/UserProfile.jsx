import { useState } from 'react';
import { Avatar, Stack, Container, Typography, Paper, Button, ButtonGroup, Tooltip } from '@mui/material';
import LegacyMemberList from './LegacyMemberList';
import { Assignment, Logout, AdminPanelSettings, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../backend/authService';

export default function UserProfile({ email = 'user@uni.minerva.edu', role = 'user' }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
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

  // Extract username from email
  const username = email ? email.split('@')[0] : 'User';
  
  // Capitalize first letter of username
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <Container sx={{m:0, px: 1, bgcolor: '#fafafa'}}>
      <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'stretch', gap: 2}}>
        <Avatar
          alt='User Avatar'
          src='https://mui.com/static/images/avatar/1.jpg'
          sx={{ width: 0.6, height: 0.6, mt: 5, boxShadow: 4, border: 5, borderColor: 'white'}}
          />
        <Typography variant='h6' sx={{fontWeight: 800}}>{displayName}</Typography>
        <Typography variant='body2' sx={{color: 'text.secondary'}}>{email}</Typography>
        <Stack direction='row' spacing={0.5} sx={{alignItems: 'center'}}>
          {role === 'admin' ? (
            <>
              <AdminPanelSettings fontSize="small" color="primary" />
              <Typography variant='body2' sx={{fontWeight: 600, color: 'primary.main'}}>Admin</Typography>
            </>
          ) : (
            <>
              <Person fontSize="small" color="info" />
              <Typography variant='body2' sx={{fontWeight: 600, color: 'info.main'}}>User</Typography>
            </>
          )}
        </Stack>
        <Stack direction='row' spacing={1} sx={{width: 1, justifyContent: 'space-between'}}>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Assignment sx={{fontSize: '2rem', color: 'yellowgreen'}}/>
            <Typography sx={{fontWeight: 800, color: 'graytext'}}>240</Typography>
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Assignment sx={{fontSize: '2rem', color: 'lightsalmon'}}/>
            <Typography sx={{fontWeight: 800, color: 'graytext'}}>240</Typography>
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Assignment sx={{fontSize: '2rem', color: 'orange'}}/>
            <Typography sx={{fontWeight: 800, color: 'graytext'}}>240</Typography>
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center'}}>
          <Assignment sx={{fontSize: '2rem', color: 'orangered'}}/>
          <Typography sx={{fontWeight: 800, color: 'graytext'}}>231</Typography>
          </Stack>
        </Stack>
        <Paper elevation={1} sx={{width: 1, borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <ButtonGroup fullWidth variant='text' sx={{width: 1, '& .MuiButton-root': {border: 'none', height: '50px'}}}>
            <Tooltip title="Logout">
              <Button onClick={handleLogout} disabled={loading}>
                <Logout />
              </Button>
            </Tooltip>
            <Button><Assignment /></Button>
            <Button><Assignment /></Button>
            <Button><Assignment /></Button>
            <Button><Assignment /></Button>
          </ButtonGroup>
        </Paper>
        <LegacyMemberList />
      </Stack>
    </Container>
  );
}