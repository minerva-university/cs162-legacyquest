import { Stack, Typography } from '@mui/material';
import LegacyQuestLogo from '../assets/LegacyQuestLogo.png';
import { useAuth } from "@services/AuthContext.jsx";

// A welcome card displayed on the dashboard, showing a welcome message and the user's name
export default function WelcomeCard({taskCompletedPercentage}) {
  const { currentUser } = useAuth();
  
  // Extract only the first name from display name or email
  const getUserName = () => {
    if (currentUser) {
      if (currentUser.displayName) {
        // Get only the first name from the display name
        return currentUser.displayName.split(' ')[0];
      } else if (currentUser.email) {
        // Extract the first part from the email (before @)
        const emailName = currentUser.email.split('@')[0];
        // If the email username has parts separated by dots or underscores, take only the first part
        const firstName = emailName.split(/[._]/)[0];
        // Convert to title case (first letter capitalized)
        return firstName.charAt(0).toUpperCase() + firstName.slice(1);
      }
    }
    return "User";
  };

  return (
    <Stack spacing={4} direction='row' sx={{py: 6, alignItems: 'center'}}>
      <img src={LegacyQuestLogo} alt='Welcome' style={{height: '120px', width: 'auto', objectFit: 'contain'}}/>
      <Stack spacing={3}>
        <Typography variant='h3'>Welcome back <span style={{fontWeight: 750}}>{getUserName()}!</span></Typography>
      </Stack>
    </Stack>
  )
}