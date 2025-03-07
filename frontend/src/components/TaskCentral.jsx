import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function TaskCentral() {
  return (
    // We can remove the border once the task central is implemented
    <Box sx={{border: 1}}>
      <Typography>Task Central</Typography>
    </Box>
  );
}