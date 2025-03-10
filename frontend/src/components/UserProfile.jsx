import { Avatar, Stack, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LegacyMemberList from './LegacyMemberList';
import StudentInfo from './StudentInfo';
import AddNewTask from './AddNewTask';

export default function UserProfile({isAdmin}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  }

  return (
    <Container sx={{m:0, px: 1, minWidth: '240px'}}>
      <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'stretch', gap: 2}}>
        {/* User Avatar and username*/}
        <Avatar
          alt='User Avatar'
          src='https://mui.com/static/images/avatar/1.jpg'
          sx={{ width: '150px', height: '150px', mt: 5, boxShadow: 4, border: 5, borderColor: 'white'}}
          />
        <Typography variant='h6' sx={{fontWeight: 800}}>User Name</Typography>

        {isAdmin ? 
          // If user is admin, show AddNewTask component
          <AddNewTask />
          :
          // If user is student, show StudentInfo and LegacyMemberList components
          <>
            <StudentInfo legacyName='VISTA' cohortName='M24' />
            <LegacyMemberList />
          </>
        }

        {/* Logout button */}
        <Button disableRipple={true} onClick={handleLogout} sx={{textTransform: 'none'}}>
          <Typography sx={{color: 'GrayText', fontWeight: 800}}>Log Out</Typography>
        </Button>
      </Stack>
    </Container>
  );
}