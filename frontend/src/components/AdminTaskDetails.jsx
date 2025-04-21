import {
  Dialog, Button, Typography, IconButton,
  Stack, Box, CircularProgress, TextField
} from "@mui/material";
import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FolderIcon from '@mui/icons-material/Folder';
import AdminAPI from "@services/AdminApi.jsx";
import TaskAPI from "@services/TaskApi.jsx";
import { getAuth } from 'firebase/auth';

export default function AdminTaskDetails({
  open,
  onClose,
  taskID,
  taskName,
  studentName,
  legacyName,
  submissionDate,
  needsApproval,
  userId,
  status,
  submissionId
}) {
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [folderLink, setFolderLink] = useState('');

  const isApproved = status === 'Approved';
  const isRejected = status === 'Rejected';

  // When dialog opens, fetch evidence and legacy folder link
  useEffect(() => {
    if (open) {
      setLoading(true);
      setEvidence('');
      setFeedback('');
      setSubmissionError(null);
      fetchTaskData();
    } else {
      // Clear data on close to avoid stale state
      setEvidence('');
      setFeedback('');
      setFolderLink('');
      setSubmissionError(null);
    }
  }, [open, taskID, legacyName, submissionId]);

  // Fetch task evidence and optional feedback
  const fetchTaskData = async () => {
    try {
      // Use TaskAPI instead of AdminAPI for folder link
      const folder = TaskAPI.getSubmissionFolderUrl(legacyName);
      setFolderLink(folder);

      // Get auth token from Firebase
      const user = getAuth().currentUser;
      if (!user) throw new Error('No authenticated user');
      const token = await user.getIdToken();

      // Use specific submission if ID is provided, otherwise fall back to latest
      let evidenceText;
      if (submissionId) {
        evidenceText = await AdminAPI.getTaskSubmissionDetails(submissionId, token);
      } else {
        evidenceText = await AdminAPI.getTaskEvidenceForAdmin(taskID, userId, token);
      }

      setEvidence(evidenceText.submitted_evidence || 'No evidence found.');

      // If approved or rejected, fetch comment
      if ((isApproved || isRejected) && evidenceText.reviewer_comment) {
        setFeedback(evidenceText.reviewer_comment);
      }
    } catch (err) {
      console.error('Failed to fetch task data:', err.message);
      setEvidence('Failed to load evidence.');
    } finally {
      setLoading(false);
    }
  };

  // Handle approval/rejection in unified handler
  const handleReview = async (action) => {
    if (action === 'reject' && !feedback.trim()) {
      setSubmissionError('Please provide a rejection reason.');
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);

    try {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();
      const result = await AdminAPI.reviewTask(taskID, userId, action, feedback, token);
      if (result.success) {
        onClose();
      } else {
        setSubmissionError(result.message || 'Review failed');
      }
    } catch (err) {
      console.error(err);
      setSubmissionError('Unexpected error occurred during review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    if (!submitting) onClose();
  };

  const handleFolderClick = () => {
    if (folderLink) window.open(folderLink, '_blank');
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          style: {
            borderRadius: 16,
            overflow: 'hidden',
            height: '90vh', // Set maximum height to 90% of viewport height
            display: 'flex',
            flexDirection: 'column'
          },
        },
      }}
    >
      <Stack sx={{ p: 1, height: '100%', overflow: 'hidden' }}>
        {/* Header */}
        <Stack direction="row" sx={{ mb: 2, flexShrink: 0 }}>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleCloseDialog} disabled={submitting}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {/* Scrollable Content Area */}
        <Stack 
          sx={{ 
            px: 4, 
            pb: 2, 
            overflow: 'auto',
            flexGrow: 1, 
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '4px',
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            {taskName}
          </Typography>

          {/* Student Info */}
          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, width: 100 }}>Student:</Typography>
            <Typography variant="subtitle1">{studentName}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, width: 100 }}>Legacy:</Typography>
            <Typography variant="subtitle1">{legacyName}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, width: 100 }}>Submitted:</Typography>
            <Typography variant="subtitle1">{submissionDate || '—'}</Typography>
          </Stack>

          {/* Folder Shortcut */}
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
                  backgroundColor: 'rgba(0, 163, 108, 0.04)',
                },
              }}
            >
              {legacyName} Folder
            </Button>
          </Box>

          {/* Evidence */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Submitted Evidence</Typography>
          <Box
            sx={{
              borderRadius: 2,
              mb: 3,
              p: 3,
              bgcolor: '#f5f5f5',
              minHeight: '100px',
              maxHeight: '250px',
              display: 'flex',
              justifyContent: loading ? 'center' : 'flex-start',
              alignItems: loading ? 'center' : 'flex-start',
              wordBreak: 'break-word',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '4px',
                backgroundColor: 'rgba(0,0,0,0.2)',
              },
            }}
          >
            {loading ? <CircularProgress /> : (
              <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', width: '100%' }}>
                {evidence}
              </Typography>
            )}
          </Box>

          {/* Feedback Field */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Admin Feedback</Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Write feedback or rejection reason..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={submitting || isApproved || isRejected}
            InputProps={{ readOnly: isApproved || isRejected }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
              ...((isApproved || isRejected) && {
                '& .MuiInputBase-input': {
                  bgcolor: '#f8f8f8',
                  color: 'text.secondary',
                },
              }),
            }}
          />

          {/* Status Messages */}
          {isApproved && (
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
              This task is already approved. Feedback cannot be changed.
            </Typography>
          )}
          {isRejected && (
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
              This task is already rejected. Feedback cannot be changed.
            </Typography>
          )}

          {/* Error Message */}
          {submissionError && (
            <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
              {submissionError}
            </Typography>
          )}

          {/* Action Buttons */}
          {needsApproval && (
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 'auto', flexShrink: 0 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleReview('reject')}
                disabled={submitting}
                sx={{ minWidth: 150, borderRadius: 4, textTransform: 'none', py: 1 }}
              >
                {submitting ? <CircularProgress size={24} /> : 'Reject'}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleReview('approve')}
                disabled={submitting}
                sx={{
                  minWidth: 150,
                  borderRadius: 4,
                  textTransform: 'none',
                  py: 1,
                  background: 'linear-gradient(90deg, #009473 0%, #00A36C 50%, #00D4A0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #00805E 0%, #009060 50%, #00C090 100%)',
                  },
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
