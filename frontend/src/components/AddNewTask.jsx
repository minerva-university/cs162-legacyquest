import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function AddNewTask() {
  const theme = useTheme();

  return (
    <Box sx={{boxShadow: `0 0 6px ${theme.palette.shadowGreen}`}}>
      {/* Placeholder, replace with actual form */}
      <Typography>Add new Task</Typography>
      
    </Box>
  )
}