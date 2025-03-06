import { Stack, Box, Typography, TextField, FormControlLabel, FormGroup, Checkbox, Button, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import MinieWelcome from '../assets/MinieWelcome.svg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GoogleIcon from '@mui/icons-material/Google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SignUpPage() {
  return (
    <Stack direction='row' sx={{height: '100vh', display: 'flex', alignItems: 'stretch'}}>
      <Stack sx={{background: 'linear-gradient(30deg, #EF8D6D, #000000)',  flexGrow: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h1' sx={{mt: 10, color: 'white'}}>Welcome to</Typography>
        <Typography variant='h1' sx={{color: 'white'}}>Legacy Dashboard!</Typography>
        <img src={MinieWelcome} alt='Minie Welcome' style={{width: '360px', height: 'auto'}} />
      </Stack>
      <Stack sx={{flexGrow: 1, py: 4, px: 10}}>
        <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
          <Link to='/'>
            <Button startIcon={<ArrowBackIosNewIcon /> } sx={{textTransform: 'none'}}>Back</Button>
          </Link>
          <Box sx={{flexGrow: 1}}></Box>
          <Typography sx={{color: 'grey'}}>I have an Account!</Typography>
          <Button sx={{textTransform: 'none'}}>Sign In</Button>
        </Stack>
        <Typography variant='h3' sx={{mt: 10}}>Create Your Account</Typography>
        <Button variant='contained' startIcon={<GoogleIcon />} sx={{width: '360px', height: '50px', my: 3, mr: 'auto', px: 6, borderRadius: '50px', background: 'linear-gradient(90deg, #E25519, #1E1E1E)', textTransform: 'none'}}>
          <Typography>Sign in with Google Account</Typography>
        </Button>
        <Typography sx={{color: 'gray', mb: 4}}>Or login with an accout and password</Typography>
        <FormGroup>
          <Stack direction='row' spacing={4}>
            <Stack sx={{flexGrow: 1}}>
              <Typography sx={{fontWeight: 800, mb: 2}}>Email address or username</Typography>
              <TextField type='text' id='username' sx={{'& .MuiOutlinedInput-root': {borderRadius: '100px'}}} slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                },
              }}/>
            </Stack>
            <Stack sx={{flexGrow: 1}}>
            <Typography sx={{fontWeight: 800, mb: 2}}>Password</Typography>
              <TextField type='password' id='first-password' sx={{'& .MuiOutlinedInput-root': {borderRadius: '100px'}}} slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                },
              }}/>
            </Stack>
          </Stack>
          <Stack direction='row' sx={{my: 1}}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
            <Box sx={{flexGrow: 1}}></Box>
            <Button sx={{textTransform: 'none'}}>Forgot password?</Button>
          </Stack>
          <Button variant='contained' sx={{width: '360px', height: '50px', my: 3, mr: 'auto', px: 6, borderRadius: '50px', background: 'linear-gradient(90deg, #E25519, #1E1E1E)', textTransform: 'none'}}>
            <Typography>Sign In</Typography>
            <ArrowForwardIcon sx={{ml: 1}}/>
          </Button>
          </FormGroup>
      </Stack>
    </Stack>
  );
}