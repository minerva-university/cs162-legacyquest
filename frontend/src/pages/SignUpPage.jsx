import { Stack, Box, Typography, TextField, FormControlLabel, FormGroup, Checkbox, Button, InputAdornment } from '@mui/material';
import MinieWelcome from '../assets/MinieWelcome.svg';
import GoogleIcon from '@mui/icons-material/Google';

{/* Login button handler */}
const handleLogin = () => {
  console.log('log in');
  // Implement login logic here
}

export default function SignUpPage() {
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
        <Typography variant='h3' sx={{mt: 10}}>Login with Minerva Email</Typography>
        <Button variant='contained' startIcon={<GoogleIcon />} onClick={handleLogin} sx={{
          width: '360px', 
          height: '50px', 
          mt: 4, 
          mb: 20,
          borderRadius: '50px', 
          background: 'linear-gradient(90deg, #E25519, #1E1E1E)', 
          textTransform: 'none'}}>
          <Typography>Sign in with Google Account</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}