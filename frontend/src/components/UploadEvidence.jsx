import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormGroup, Typography, IconButton, Stack, Box } from '@mui/material';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function UploadEvidence({ open, onClose }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitting evidence:', description);
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <Stack sx={{p: 2}}>
        {/* Close Button */}
        <Stack direction='row' sx={{mb: 4}}>
          {/* Spacer */}
          <Box sx={{flexGrow: 1}} />
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>

        </Stack>

        {/* Form */}
        <FormGroup onSubmit={handleSubmit}>
          <Stack sx={{px: 10, textAlign: 'center'}}>
            <Typography variant='h4' sx={{fontWeight: 800, mb: 2}}>Group Photo on Coit Tower</Typography>
            <Typography>Enter Proof to submit and get points!</Typography>
            <DialogContent>
              <TextField
                margin='dense'
                label='Description'
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button type='submit' variant='contained' fullWidth sx={{
                background: 'linear-gradient(90deg, #020024 0%, #090979 20%, #00D4FF 100%)',
                textTransform: 'none',
                borderRadius: 2}}>
                Submit
              </Button>
            </DialogActions>
          </Stack>
        </FormGroup>
      </Stack>
    </Dialog>
  );
}