import { Dialog, DialogActions, Button, Typography, IconButton, Stack, Box, CircularProgress, TextField, Paper } from "@mui/material";
import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdminAPI from "@services/AdminApi.jsx";
import FolderIcon from '@mui/icons-material/Folder';

export default function AdminTaskDetails({ open, onClose, taskID, taskName, studentName, legacyName, submissionDate, needsApproval }) {
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [folderLink, setFolderLink] = useState('');
  
  // If task is approved (needsApproval is false and task was submitted), the task has already been approved
  const isApproved = submissionDate && !needsApproval;
  
  // Reset state when dialog is opened with a new task or closed
  useEffect(() => {
    if (open) {
      // Reset states when opening a new task
      setLoading(true);
      setEvidence('');
      setFeedback('');
      setSubmissionError(null);
      
      fetchTaskData(taskID);
    } else {
      // Clear data when closing to avoid showing stale data next time
      setEvidence('');
      setFeedback('');
      setSubmissionError(null);
      setFolderLink('');
    }
  }, [open, taskID]);
  
  // Fetch task data separately
  const fetchTaskData = async (id) => {
    if (!id) return;
    
    try {
      // In a real app, this would fetch evidence from the API
      // Mocking API call for now
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate different evidence for different tasks
      const evidenceTexts = {
        1: "This is evidence for Task 1. The student visited the museum and completed all required activities.",
        2: "Evidence for Task 2 includes a written report and photos from the event.",
        3: "For Task 3, the student submitted a video presentation and feedback from participants.",
        4: "Task 4 evidence contains documentation of the community service hours.",
        5: "The student's Task 5 submission includes reflections on the learning experience.",
      };
      
      // Simulate folder links per legacy
      const folderLinks = {
        'Vista': 'https://drive.google.com/drive/folders/vista-legacy-folder',
        'Tower': 'https://drive.google.com/drive/folders/tower-legacy-folder',
        'Bridge': 'https://drive.google.com/drive/folders/bridge-legacy-folder',
        'Chronicle': 'https://drive.google.com/drive/folders/chronicle-legacy-folder',
        'Pulse': 'https://drive.google.com/drive/folders/pulse-legacy-folder',
      };
      
      // Simulate previous feedback for approved tasks
      const approvedFeedback = {
        2: "Great job on completing this task! Your attention to detail was excellent.",
        4: "Well done. I appreciate the thoroughness of your documentation.",
        6: "Excellent work! Your contribution to this project was outstanding."
      };
      
      // Use taskID to get specific evidence, or default if not found
      setEvidence(evidenceTexts[id] || "This task evidence was submitted by the student. The content is specific to this task.");
      
      // Set folder link based on legacy name
      setFolderLink(folderLinks[legacyName] || 'https://drive.google.com/drive/folders/default-folder');
      
      // If task is approved, load the previous feedback
      if (isApproved) {
        setFeedback(approvedFeedback[id] || "This task has been approved.");
      }
    } catch (error) {
      console.error(`Error fetching data for task ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFolderClick = () => {
    // In production, this would open the Google Drive folder
    console.log(`Opening folder: ${folderLink}`);
    // window.open(folderLink, '_blank');
  };
  
  const handleCloseDialog = () => {
    // Don't allow closing while submitting
    if (submitting) return;
    
    // Clear feedback and error on close
    setFeedback('');
    setSubmissionError(null);
    onClose();
  };
  
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
      onClose={handleCloseDialog} 
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

          <IconButton onClick={handleCloseDialog} disabled={submitting}>
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
          
          {/* Folder Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<FolderIcon />}
              onClick={handleFolderClick}
              sx={{
                borderRadius: 2,
                py: 1,
                px: 3,
                textTransform: 'none',
                fontWeight: 'medium',
                borderColor: '#00A36C',
                color: '#00A36C',
                '&:hover': {
                  borderColor: '#009060',
                  backgroundColor: 'rgba(0, 163, 108, 0.04)'
                }
              }}
            >
              {legacyName} Folder
            </Button>
          </Box>
          
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
            disabled={submitting || isApproved}
            InputProps={{
              readOnly: isApproved,
            }}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              },
              ...(isApproved && {
                '& .MuiInputBase-input': {
                  bgcolor: '#f8f8f8',
                  color: 'text.secondary'
                }
              })
            }}
          />
          
          {/* Show a message explaining why the feedback is not editable */}
          {isApproved && (
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, textAlign: 'center', display: 'block' }}>
              This task has been approved. Feedback cannot be edited.
            </Typography>
          )}
          
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