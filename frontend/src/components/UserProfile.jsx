import { Avatar, Stack, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LegacyMemberList from './LegacyMemberList';
import StudentInfo from './StudentInfo';
import AddNewTask from './AddNewTask';
import { useAuth } from '../../backend/AuthContext.jsx';
import { logoutUser } from '../../backend/authService';

export default function UserProfile({isAdmin}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Extract user's display name or first part of email
  const getUserName = () => {
    if (currentUser) {
      if (currentUser.displayName) {
        return currentUser.displayName;
      } else if (currentUser.email) {
        // Extract the name part from the email (before @)
        const emailName = currentUser.email.split('@')[0];
        // Convert to title case (first letter capitalized)
        return emailName.charAt(0).toUpperCase() + emailName.slice(1);
      }
    }
    return "User";
  };

  // Get user profile photo from Google account
  const getProfilePhoto = () => {
    if (currentUser) {
      // Check for photoURL from Google account
      if (currentUser.photoURL) {
        console.log("Found photoURL:", currentUser.photoURL); // Debugging log
        return currentUser.photoURL;
      }
      
      // If using Firebase Auth with Google, try to get from providerData
      if (currentUser.providerData && currentUser.providerData.length > 0) {
        const googleProvider = currentUser.providerData.find(
          provider => provider.providerId === 'google.com'
        );
        
        if (googleProvider && googleProvider.photoURL) {
          console.log("Found provider photoURL:", googleProvider.photoURL); // Debugging log
          return googleProvider.photoURL;
        }
      }
    }
    
    // Fallback to a default avatar if no photo is available
    console.log("No photo found, using default"); // Debugging log
    return 'https://mui.com/static/images/avatar/1.jpg';
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Container sx={{m:0, px: 1, minWidth: '300px'}}>
      <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'stretch', gap: 2}}>
        {/* User Avatar and username*/}
        <Avatar
          alt='User Avatar'
          src={getProfilePhoto()}
          sx={{ 
            width: '150px', 
            height: '150px', 
            mt: 5, 
            boxShadow: 4, 
            border: 5, 
            borderColor: 'white'
          }}
        />
        <Typography variant='h6' sx={{fontWeight: 800}}>{getUserName()}</Typography>

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