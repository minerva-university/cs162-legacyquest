import { Dialog, DialogContent, DialogActions, Button, TextField, FormGroup, Typography, 
  IconButton, Stack, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TaskApi from '@services/TaskApi.jsx';
import { useAuth } from '@services/AuthContext.jsx';

export default function UploadEvidence({ open, onClose, taskID, taskName, description, onSuccessfulSubmit }) {
  const { idToken } = useAuth();
  const [evidence, setEvidence] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await TaskApi.uploadEvidence(taskID, evidence, idToken);
      if (response.success) {
        setEvidence('');
        setSnackbarMessage('Evidence uploaded successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        
        // Call the refresh callback if provided
        if (typeof onSuccessfulSubmit === 'function') {
          onSuccessfulSubmit();
        }
        
        onClose();
      } else {
        // ...existing error handling code...
      }
    } catch (err) {
      // ...existing error handling code...
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent closing dialog while submitting
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };
  
  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth='md' 
        fullWidth 
        disableEscapeKeyDown={isSubmitting}
        slotProps={{
          paper: {
            style: {
              borderRadius: 16,
              overflow: 'hidden'
            }
          }
        }}
      >
        <Stack sx={{p: 1}}>
          {/* Close Button */}
          <Stack direction='row' sx={{mb: 4}}>
            {/* Spacer */}
            <Box sx={{flexGrow: 1}} />

            <IconButton onClick={handleClose} disabled={isSubmitting}>
              <CloseRoundedIcon />
            </IconButton>

          </Stack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack sx={{px: 4, pb: 2, textAlign: 'center'}}>
              <Typography variant='h4' sx={{fontWeight: 800, mb: 2}}>Submit Evidence for {taskName}</Typography>
              <Typography variant='h6' sx={{textAlign: 'left', fontWeight: 800, mb: 1}}>Description</Typography>
              <Box 
                sx={{ 
                  maxHeight: '200px', 
                  overflowY: 'auto', 
                  borderRadius: 1, 
                  mb: 2, 
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#bdbdbd',
                    borderRadius: '4px',
                  },
                }}
              >
                <Typography align='left'>{description}</Typography>
              </Box>
              
              <Typography variant='h6' sx={{textAlign: 'left', fontWeight: 800, my: 1}}>Evidence Submission</Typography>
              <TextField
                margin='dense'
                label='Description'
                fullWidth
                multiline
                rows={8}
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                required
                disabled={isSubmitting}
                sx={{mb: 2}}
              />
              
              {/* Error message display inside form */}
              {error && (
                <Typography color='error' sx={{mb: 2}}>
                  {error}
                </Typography>
              )}
              
              <DialogActions>
                <Button 
                  type='submit' 
                  variant='contained' 
                  fullWidth 
                  disabled={isSubmitting}
                  sx={{
                    background: 'linear-gradient(90deg, #020024 0%, #090979 20%, #00D4FF 100%)',
                    textTransform: 'none',
                    borderRadius: 2,
                    mx: 'auto',
                    maxWidth: '470px',
                  }}
                >
                  {isSubmitting ? (
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <CircularProgress size={20} color='primary'/>
                      <span style={{color: 'white'}}>Submitting...</span>
                    </Stack>
                  ) : 'Submit'}
                </Button>
              </DialogActions>
            </Stack>
          </form>
        </Stack>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}