import { useState } from 'react';
import { Stack, Box, Typography, TextField, FormControlLabel, FormGroup, Checkbox, Button, InputAdornment, Alert, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MinieWelcome from '../assets/MinieWelcome.svg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GoogleIcon from '@mui/icons-material/Google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { loginWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword } from '../../../backend/authService';
import { useAuth } from '../../../backend/AuthContext';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser, userRole } = useAuth();

  // Redirect if already logged in
  if (currentUser) {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithGoogle();
      
      // Redirect based on user role
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let result;
      
      if (isSignUp) {
        // Register new user
        result = await registerWithEmailAndPassword(email, password);
      } else {
        // Login existing user
        result = await loginWithEmailAndPassword(email, password);
      }
      
      // Redirect based on user role
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const handleCloseError = () => {
    setError('');
  };

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
          <Typography sx={{color: 'grey'}}>{isSignUp ? 'Already have an account?' : 'Need an account?'}</Typography>
          <Button onClick={toggleSignUp} sx={{textTransform: 'none'}}>{isSignUp ? 'Sign In' : 'Sign Up'}</Button>
        </Stack>
        <Typography variant='h3' sx={{mt: 10}}>{isSignUp ? 'Create Your Account' : 'Sign In to Your Account'}</Typography>
        
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        
        <Button 
          variant='contained' 
          startIcon={<GoogleIcon />} 
          onClick={handleGoogleSignIn}
          disabled={loading}
          sx={{width: '360px', height: '50px', my: 3, mr: 'auto', px: 6, borderRadius: '50px', background: 'linear-gradient(90deg, #E25519, #1E1E1E)', textTransform: 'none'}}
        >
          <Typography>Sign in with Google Account</Typography>
        </Button>
        <Typography sx={{color: 'gray', mb: 4}}>Or login with an email and password</Typography>
        <FormGroup component="form" onSubmit={handleSubmit}>
          <Stack direction='row' spacing={4}>
            <Stack sx={{flexGrow: 1}}>
              <Typography sx={{fontWeight: 800, mb: 2}}>Email address</Typography>
              <TextField 
                type='email' 
                id='email' 
                value={email}
                onChange={handleEmailChange}
                placeholder='your.name@uni.minerva.edu'
                required
                sx={{'& .MuiOutlinedInput-root': {borderRadius: '100px'}}} 
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
            <Stack sx={{flexGrow: 1}}>
              <Typography sx={{fontWeight: 800, mb: 2}}>Password</Typography>
              <TextField 
                type='password' 
                id='password' 
                value={password}
                onChange={handlePasswordChange}
                required
                sx={{'& .MuiOutlinedInput-root': {borderRadius: '100px'}}} 
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack direction='row' sx={{my: 1}}>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={rememberMe} 
                  onChange={handleRememberMeChange} 
                />
              } 
              label="Remember Me" 
            />
            <Box sx={{flexGrow: 1}}></Box>
            <Button sx={{textTransform: 'none'}}>Forgot password?</Button>
          </Stack>
          <Button 
            variant='contained' 
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            sx={{width: '360px', height: '50px', my: 3, mr: 'auto', px: 6, borderRadius: '50px', background: 'linear-gradient(90deg, #E25519, #1E1E1E)', textTransform: 'none'}}
          >
            <Typography>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <ArrowForwardIcon sx={{ml: 1}}/>
          </Button>
          <Typography variant="body2" sx={{mt: 2, color: 'text.secondary'}}>
            Note: Only Minerva University email addresses (@uni.minerva.edu) are allowed.
          </Typography>
        </FormGroup>
      </Stack>
    </Stack>
  );
}