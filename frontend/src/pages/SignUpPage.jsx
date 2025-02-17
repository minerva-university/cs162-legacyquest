import { Stack, Box, Typography, TextField, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import MinieWelcome from '../assets/MinieWelcome.svg';

export default function SignUpPage() {
  return (
    <Stack direction='row' sx={{height: '100vh', display: 'flex', alignItems: 'stretch'}}>
      <Stack sx={{background: 'linear-gradient(30deg, #EF8D6D, #000000)',  flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h1' sx={{mt: 10, color: 'white'}}>Welcome to</Typography>
        <Typography variant='h1' sx={{color: 'white'}}>Legacy Dashboard!</Typography>
        <img src={MinieWelcome} alt='Minie Welcome' style={{width: '360px', height: 'auto'}} />
      </Stack>
      <Stack sx={{flexGrow: 1, p: 4}}>
        <Typography variant='h3'>Create Your Account</Typography>
        <FormGroup>
          <Stack direction='row' spacing={4}>
            <Stack>
              <Typography>Email address or username</Typography>
              <TextField type='text' id='first-name' />
            </Stack>
            <Stack>
            <Typography>Password</Typography>
              <TextField type='text' id='first-name' />
            </Stack>
          </Stack>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
          </FormGroup>
      </Stack>
    </Stack>
  );
}