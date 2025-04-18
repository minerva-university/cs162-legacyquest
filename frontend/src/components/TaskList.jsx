import { List, Stack, Box } from '@mui/material';
import ListedTask from './ListedTask';

// A list of task, displayed on student side
export default function TaskList({tasks, onRefreshTasks}) {
  return (
    <Stack sx={{width: 1, minWidth: '350px', maxWidth: '800px'}}>
      {/* Display the task list as a scrollable area*/}
      <Box 
        sx={{ 
          maxHeight: '360px',
          overflowY: 'auto',
          pr: 1,
          mr: -1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '4px',
            border: '0px solid transparent',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            border: '0px solid transparent',
            backgroundClip: 'padding-box',
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
              onRefreshTasks={onRefreshTasks}
            />
          ))}
        </List>
      </Box>
    </Stack>
  );
}