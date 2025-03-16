import { Stack, Typography } from '@mui/material';
import MinieWelcome from '../assets/MinieWelcome.svg';
import { useAuth } from '../../backend/AuthContext.jsx';

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
      <img src={MinieWelcome} alt='Welcome' style={{height: '120px', width: 'auto', objectFit: 'contain', transform: 'rotate(-20deg)'}}/>
      <Stack spacing={3}>
        <Typography variant='h3'>Welcome back <span style={{fontWeight: 750}}>{getUserName()}!</span></Typography>
        <Stack direction='row'>
          <Typography sx={{fontWeight: 600}}>
            You have Completed <span style={{fontWeight: 700, color: '#CC6A02'}}>{taskCompletedPercentage}% of your daily goal!</span>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}