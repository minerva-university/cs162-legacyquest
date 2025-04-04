import { Dialog, DialogContent, DialogActions, Button, TextField, FormGroup, Typography, IconButton, Stack, Box } from '@mui/material';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FileUpload from './FileUpload';

export default function UploadEvidence({ open, onClose, taskName }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitting evidence:', description);
    setDescription('');
    onClose();
  };

  const handleFileUpload = (files) => {
    console.log('Uploaded Files:', files);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth slotProps={{
      paper: {
        style: {
          borderRadius: 16,
          overflow: 'hidden'
        }
      }
    }}>
      <Stack sx={{p: 1}}>
        {/* Close Button */}
        <Stack direction='row' sx={{mb: 4}}>
          {/* Spacer */}
          <Box sx={{flexGrow: 1}} />

          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>

        </Stack>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack sx={{px: 4, pb: 2, textAlign: 'center'}}>
            <Typography variant='h4' sx={{fontWeight: 800, mb: 2}}>Submit Evidence for {taskName}</Typography>
            <Typography>Submit evidence to complete tasks and score points for your legacy!</Typography>
            <Typography>Please use <span style={{fontWeight: 800}}>Google Drive</span> links to submit any image or files.</Typography>
            <DialogContent>
              <TextField
                margin='dense'
                label='Description'
                fullWidth
                multiline
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{mt: 2}}
              />
            </DialogContent>
            <DialogActions>
              <Button type='submit' variant='contained' fullWidth sx={{
                background: 'linear-gradient(90deg, #020024 0%, #090979 20%, #00D4FF 100%)',
                textTransform: 'none',
                borderRadius: 2,
                mx: 'auto',
                maxWidth: '470px'}}>
                Submit
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  );
}