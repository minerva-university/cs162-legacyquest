import { Dialog, DialogActions, Button, Typography, IconButton, Stack, Box, CircularProgress, TextField, Paper } from "@mui/material";
import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdminAPI from "@services/AdminApi.jsx";
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function AdminTaskDetails({ open, onClose, taskID, taskName, studentName, legacyName, submissionDate, needsApproval }) {
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  // Sample attached files
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'assignment1_submission.pdf', type: 'document', size: '2.4 MB' }
  ]);
  
  useEffect(() => {
    async function fetchData() {
      if (open && taskID) {
        // Clear previous data first to avoid displaying stale content
        setEvidence('');
        setLoading(true);
        
        try {
          // In a real app, this would fetch evidence from the API
          // Mocking API call for now
          await new Promise(resolve => setTimeout(resolve, 800));
          setEvidence("This is sample evidence submitted by the student. In a real implementation, this would show the actual evidence text or links submitted by the student for this specific task.");
        } catch (error) {
          console.error("Error fetching task evidence:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchData();
  }, [open, taskID]);
  
  const handleApprove = async () => {
    setSubmitting(true);
    setSubmissionError(null);
    
    try {
      const result = await AdminAPI.approveTask(taskID, feedback);
      if (result.success) {
        onClose();
        // In a real app, you would also refresh the task list
      } else {
        setSubmissionError(result.message || "Error approving task");
      }
    } catch (error) {
      console.error("Error approving task:", error);
      setSubmissionError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleReject = async () => {
    if (!feedback) {
      setSubmissionError("Please provide feedback when rejecting a task");
      return;
    }
    
    setSubmitting(true);
    setSubmissionError(null);
    
    try {
      const result = await AdminAPI.rejectTask(taskID, feedback);
      if (result.success) {
        onClose();
        // In a real app, you would also refresh the task list
      } else {
        setSubmissionError(result.message || "Error rejecting task");
      }
    } catch (error) {
      console.error("Error rejecting task:", error);
      setSubmissionError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={submitting ? undefined : onClose} 
      maxWidth='md' 
      fullWidth
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
        <Stack direction='row' sx={{mb: 2}}>
          {/* Spacer */}
          <Box sx={{flexGrow: 1}} />

          <IconButton onClick={onClose} disabled={submitting}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Stack sx={{px: 4, pb: 2}}>
          <Typography variant='h4' sx={{fontWeight: 800, mb: 2, textAlign: 'center'}}>
            {taskName}
          </Typography>
          
          {/* Student Info */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
              <Typography variant='subtitle1' sx={{fontWeight: 700, width: 100}}>
                Student:
              </Typography>
              <Typography variant='subtitle1'>
                {studentName}
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
              <Typography variant='subtitle1' sx={{fontWeight: 700, width: 100}}>
                Legacy:
              </Typography>
              <Typography variant='subtitle1'>
                {legacyName}
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <Typography variant='subtitle1' sx={{fontWeight: 700, width: 100}}>
                Submitted:
              </Typography>
              <Typography variant='subtitle1'>
                {submissionDate}
              </Typography>
            </Stack>
          </Box>
          
          {/* Attached Files section */}
          <Typography variant='h6' sx={{fontWeight: 700, mb: 2}}>
            Attached Files
          </Typography>
          
          {attachedFiles.map((file, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                py: 1.5,
                px: 2,
                mb: 3,
                borderRadius: 2,
                borderColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <AttachFileIcon sx={{ mr: 1, color: '#757575' }} />
              <Typography>{file.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                {file.size}
              </Typography>
            </Paper>
          ))}
          
          {/* Submitted Evidence section */}
          <Typography variant='h6' sx={{fontWeight: 700, mb: 2}}>
            Submitted Evidence
          </Typography>
          
          <Box 
            sx={{ 
              borderRadius: 2,
              mb: 3,
              p: 3,
              bgcolor: '#f5f5f5',
              minHeight: '100px',
              display: 'flex',
              justifyContent: loading ? 'center' : 'flex-start',
              alignItems: loading ? 'center' : 'flex-start',
              wordBreak: 'break-word',
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography 
                align='left'
                sx={{
                  width: '100%',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                }}
              >
                {evidence}
              </Typography>
            )}
          </Box>
          
          {/* Admin Feedback section */}
          <Typography variant='h6' sx={{fontWeight: 700, mb: 2}}>
            Admin Feedback
          </Typography>
          
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Provide feedback to the student..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={submitting}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          
          {/* Error message if any */}
          {submissionError && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {submissionError}
            </Typography>
          )}
          
          {/* Action buttons */}
          {needsApproval && (
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                color="error"
                onClick={handleReject}
                disabled={submitting}
                sx={{
                  minWidth: '150px',
                  borderRadius: 4,
                  textTransform: 'none',
                  py: 1,
                }}
              >
                {submitting ? <CircularProgress size={24} /> : 'Reject'}
              </Button>
              
              <Button 
                variant="contained" 
                onClick={handleApprove}
                disabled={submitting}
                sx={{
                  minWidth: '150px',
                  borderRadius: 4,
                  textTransform: 'none',
                  py: 1,
                  background: 'linear-gradient(90deg, #009473 0%, #00A36C 50%, #00D4A0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #00805E 0%, #009060 50%, #00C090 100%)'
                  }
                }}
              >
                {submitting ? <CircularProgress size={24} /> : 'Approve'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
} 