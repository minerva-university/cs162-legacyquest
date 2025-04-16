import {
  Dialog, Button, Typography, IconButton,
  Stack, Box, CircularProgress, TextField
} from "@mui/material";
import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FolderIcon from '@mui/icons-material/Folder';
import AdminAPI from "@services/AdminApi.jsx";
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
  userId
}) {
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [folderLink, setFolderLink] = useState('');

  const isApproved = submissionDate && !needsApproval;

  // When dialog opens, fetch evidence and legacy folder link
  useEffect(() => {
    if (open) {
      setLoading(true);
      setEvidence('');
      setFeedback('');
      setSubmissionError(null);
      fetchTaskData(taskID, legacyName);
    } else {
      // Clear data on close to avoid stale state
      setEvidence('');
      setFeedback('');
      setFolderLink('');
      setSubmissionError(null);
    }
  }, [open, taskID, legacyName]);

  // Fetch task evidence and optional feedback
  const fetchTaskData = async (id, legacy) => {
    try {
      const folder = await AdminAPI.getLegacyFolderLink(legacy);
      setFolderLink(folder);

      // Get auth token from Firebase
      const user = getAuth().currentUser;
      if (!user) throw new Error('No authenticated user');
      const token = await user.getIdToken();

      // Fetch task evidence with token
      const evidenceText = await AdminAPI.getTaskEvidenceForAdmin(id, userId, token);
      setEvidence(evidenceText.submitted_evidence || 'No evidence found.');

      // If approved, fetch comment
      if (isApproved && evidenceText.reviewer_comment) {
        setFeedback(evidenceText.reviewer_comment);
      }
    } catch (err) {
      console.error('Failed to fetch task data:', err.message);
      setEvidence('Failed to load evidence.');
    } finally {
      setLoading(false);
    }
  };

  // Handle approval submission
  const handleApprove = async () => {
    setSubmitting(true);
    setSubmissionError(null);
    try {
      const result = await AdminAPI.approveTask(taskID, feedback);
      if (result.success) onClose();
      else setSubmissionError(result.message || 'Approval failed');
    } catch (err) {
      console.error(err);
      setSubmissionError('Unexpected error occurred during approval');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle rejection submission
  const handleReject = async () => {
    if (!feedback.trim()) {
      setSubmissionError('Please provide a rejection reason.');
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);
    try {
      const result = await AdminAPI.rejectTask(taskID, feedback);
      if (result.success) onClose();
      else setSubmissionError(result.message || 'Rejection failed');
    } catch (err) {
      console.error(err);
      setSubmissionError('Unexpected error occurred during rejection');
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
      slotProps={{
        paper: {
          style: {
            borderRadius: 16,
            overflow: 'hidden',
          },
        },
      }}
    >
      <Stack sx={{ p: 1 }}>
        {/* Header */}
        <Stack direction="row" sx={{ mb: 2 }}>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleCloseDialog} disabled={submitting}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Stack sx={{ px: 4, pb: 2 }}>
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
              display: 'flex',
              justifyContent: loading ? 'center' : 'flex-start',
              alignItems: loading ? 'center' : 'flex-start',
              wordBreak: 'break-word',
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
            disabled={submitting || isApproved}
            InputProps={{ readOnly: isApproved }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
              ...(isApproved && {
                '& .MuiInputBase-input': {
                  bgcolor: '#f8f8f8',
                  color: 'text.secondary',
                },
              }),
            }}
          />

          {/* Approved Message */}
          {isApproved && (
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
              This task is already approved. Feedback cannot be changed.
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
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="error"
                onClick={handleReject}
                disabled={submitting}
                sx={{ minWidth: 150, borderRadius: 4, textTransform: 'none', py: 1 }}
              >
                {submitting ? <CircularProgress size={24} /> : 'Reject'}
              </Button>
              <Button
                variant="contained"
                onClick={handleApprove}
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
