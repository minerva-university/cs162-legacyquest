import { Stack, Typography, Button, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LegacyQuestLogo from '../assets/LegacyQuestLogo.png';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle, logoutUser } from '../../backend/authService';
import { useAuth } from '../../backend/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { currentUser, isAdmin, isUser, isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to appropriate page
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else if (isUser) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, isUser, navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { role } = await signInWithGoogle();
      
      // The redirection will be handled by the useEffect above
      console.log(`User signed in with role: ${role}`);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Failed to sign in. Please try again.");
      setIsSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Stack direction='row' sx={{height: '100vh', display: 'flex', alignItems: 'stretch'}}>
      {/* Left Side: Welcome and Logo */}
      <Stack sx={{background: 'linear-gradient(30deg, #EF8D6D, #000000)', flexGrow: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h1' sx={{mt: 10, color: 'white'}}>Welcome to</Typography>
        <Typography variant='h1' sx={{color: 'white'}}>Legacy Dashboard!</Typography>
        <img src={LegacyQuestLogo} alt='Legacy Quest Logo' style={{width: '360px', height: 'auto'}} />
      </Stack>

      {/* Right Side: login */}
      <Stack sx={{flexGrow: 1, py: 4, px: 10, justifyContent: 'center', alignItems: 'center'}}>
        {/* Combined Login Button */}
        <Typography variant='h3' sx={{mb: 3}}>Sign In as Student or Admin</Typography>
        <Button 
          variant='contained' 
          startIcon={<GoogleIcon />} 
          onClick={handleLogin}
          disabled={loading}
          sx={{
            width: '360px', 
            height: '50px', 
            my: 2, 
            borderRadius: '50px', 
            background: 'linear-gradient(90deg, #E25519, #1E1E1E)', 
            textTransform: 'none'
          }}
        >
          <Typography>
            {loading ? 'Signing in...' : 'Sign in with Minerva University Gmail'}
          </Typography>
        </Button>
      </Stack>

      {/* Error Snackbar */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}