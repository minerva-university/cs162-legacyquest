import { Stack, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MinieWelcome from '../assets/MinieWelcome.svg';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  const navigate = useNavigate();

  {/* Login button handler */}
  const handleStudentLogin = () => {
    // Replace and implement login logic here. Navigate to '/' if login successful.
    if (true) {
      navigate('/dashboard');
    }
  }

  const handleAdminLogin = () => {
    // Replace and implement login logic here. Navigate to '/' if login successful.
    if (true) {
      navigate('/admin');
    }
  }

  return (
    <Stack direction='row' sx={{height: '100vh', display: 'flex', alignItems: 'stretch'}}>
      {/* Left Side: Welcome and Logo */}
      <Stack sx={{background: 'linear-gradient(30deg, #EF8D6D, #000000)',  flexGrow: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h1' sx={{mt: 10, color: 'white'}}>Welcome to</Typography>
        <Typography variant='h1' sx={{color: 'white'}}>Legacy Dashboard!</Typography>
        <img src={MinieWelcome} alt='Minie Welcome' style={{width: '360px', height: 'auto'}} />
      </Stack>

      {/* Right Side: login */}
      <Stack sx={{flexGrow: 1, py: 4, px: 10, justifyContent: 'center', alignItems: 'center'}}>
        {/* Student Login */}
        <Typography variant='h3'>Student Login</Typography>
        <Button variant='contained' startIcon={<GoogleIcon />} onClick={handleStudentLogin} sx={{
          width: '360px', 
          height: '50px', 
          my: 2, 
          borderRadius: '50px', 
          background: 'linear-gradient(90deg, #E25519, #1E1E1E)', 
          textTransform: 'none'}}>
          <Typography>Sign in with Google Account</Typography>
        </Button>
          
        {/* Spacer */}
        <Box sx={{height: '40px'}}></Box>

        {/* Admin Login */}
        <Typography variant='h3'>Admin Login</Typography>
        <Button variant='contained' startIcon={<GoogleIcon />} onClick={handleAdminLogin} sx={{
          width: '360px', 
          height: '50px', 
          my: 2, 
          borderRadius: '50px', 
          background: 'linear-gradient(90deg, #E25519, #1E1E1E)', 
          textTransform: 'none'}}>
          <Typography>Sign in with Google Account</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}