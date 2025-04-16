import {
  Dialog, DialogActions, Button, Typography, IconButton,
  Stack, Box, CircularProgress
} from "@mui/material";
import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import UploadEvidence from './UploadEvidence';
import TaskApi from "@services/TaskApi.jsx";
import { useAuth } from '@services/AuthContext.jsx';

export default function TaskFeedback({
  open,
  onClose,
  taskID,
  taskName,
  description,
  status,
  statusColor,
  onSuccessfulSubmit
}) {
  const [uploadEvidenceOpen, setUploadEvidenceOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState('');
  const [comment, setComment] = useState('');
  const { idToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (open) {
        setEvidence('');
        setComment('');
        setLoading(true);

        try {
          if (status === 'Waiting Approval' || status === 'Submitted') {
            const evidenceData = await TaskApi.getTaskEvidence(taskID, idToken);
            setEvidence(evidenceData);
          } else if (status === 'Rejected' || status === 'Approved') {
            const commentData = await TaskApi.getTaskComments(taskID, idToken);
            setComment(commentData);
          }
        } catch (error) {
          console.error("Error fetching task data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [open, taskID, status, idToken]);

  const handleResubmit = () => {
    onClose();
    setUploadEvidenceOpen(true);
  };

  const handleUploadClose = () => {
    setUploadEvidenceOpen(false);
  };

  const getContentTitle = () => {
    switch (status) {
      case 'Waiting Approval':
      case 'Submitted':
        return 'Your Submitted Evidence';
      case 'Approved':
        return 'Approval Comment';
      case 'Rejected':
        return 'Reason for Rejection';
      default:
        return 'Details';
    }
  };

  const getContent = () => {
    if (status === 'Waiting Approval' || status === 'Submitted') return evidence;
    if (status === 'Rejected' || status === 'Approved') return comment;
    return '';
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth
        slotProps={{ paper: { style: { borderRadius: 16, overflow: 'hidden' } } }}
      >
        <Stack sx={{ p: 1 }}>
          <Stack direction='row' sx={{ mb: 4 }}>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={onClose}><CloseRoundedIcon /></IconButton>
          </Stack>

          <Stack sx={{ px: 4, pb: 2, textAlign: 'center' }}>
            <Typography variant='h4' sx={{ fontWeight: 800, mb: 2 }}>{taskName}</Typography>
            <Typography variant='h6' sx={{ fontWeight: 800, mb: 1, textAlign: 'center', color: statusColor }}>
              {(status === 'Submitted') ? 'Waiting Approval' : status}
            </Typography>
            <Typography variant='h6' sx={{ textAlign: 'left', fontWeight: 800, mb: 1 }}>
              {getContentTitle()}
            </Typography>

            <Box
              sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                borderRadius: 1,
                mb: 3,
                p: 2,
                backgroundColor: '#f5f5f5',
                minHeight: '100px',
                display: 'flex',
                justifyContent: loading ? 'center' : 'flex-start',
                alignItems: loading ? 'center' : 'flex-start',
                wordBreak: 'break-word',
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px' }
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
                    overflowWrap: 'break-word'
                  }}
                >
                  {getContent()}
                </Typography>
              )}
            </Box>

            {status === 'Rejected' && (
              <DialogActions>
                <Button
                  variant='contained'
                  fullWidth
                  onClick={handleResubmit}
                  sx={{
                    background: 'linear-gradient(90deg, #020024 0%, #090979 20%, #00D4FF 100%)',
                    textTransform: 'none',
                    borderRadius: 2,
                    mx: 'auto',
                    maxWidth: '470px',
                  }}
                >
                  Adjust and Resubmit
                </Button>
              </DialogActions>
            )}
          </Stack>
        </Stack>
      </Dialog>

      <UploadEvidence
        open={uploadEvidenceOpen}
        onClose={handleUploadClose}
        taskID={taskID}
        taskName={taskName}
        description={description}
        onSuccessfulSubmit={onSuccessfulSubmit}
      />
    </>
  );
}
