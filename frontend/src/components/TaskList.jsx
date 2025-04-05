import { List, Stack, Typography } from '@mui/material';
import ListedTask from './ListedTask';

export default function TaskList({tasks}) {
  return (
      <Stack sx={{width: 1, minWidth: '200px', maxWidth: '500px'}}>
        <List>
          {tasks.map((task, index) => (
            <ListedTask key={index} taskID={task.taskID} taskName={task.name} taskDescription={task.description} taskStatus={task.status} dueDate={task.dueDate}/>
          ))}
        </List>
      </Stack>
  );
}