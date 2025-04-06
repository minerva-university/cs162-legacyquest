import { List, Stack, Box } from '@mui/material';
import ListedTask from './ListedTask';

export default function TaskList({tasks}) {
  return (
    <Stack sx={{width: 1, minWidth: '200px', maxWidth: '500px'}}>
      <Box 
        sx={{ 
          maxHeight: '400px',
          overflowY: 'auto',
          pr: 1, // Add right padding to create space between content and scrollbar
          mr: -1, // Add negative margin to compensate for padding in container width
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '4px',
            border: '0px solid transparent', // Add transparent border
            backgroundClip: 'padding-box', // This makes the border transparent but keeps content visible
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            border: '0px solid transparent', // Add transparent border
            backgroundClip: 'padding-box', // This makes the border transparent but keeps content visible
          },
        }}
      >
        <List sx={{ pt: 0 }}>
          {tasks.map((task, index) => (
            <ListedTask 
              key={index} 
              taskID={task.taskID} 
              taskName={task.name} 
              taskDescription={task.description} 
              taskStatus={task.status} 
              dueDate={task.dueDate}
            />
          ))}
        </List>
      </Box>
    </Stack>
  );
}