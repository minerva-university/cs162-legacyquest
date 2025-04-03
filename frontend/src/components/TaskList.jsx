import { List, Stack, Typography } from '@mui/material';
import ListedTask from './ListedTask';

export default function TaskList() {
  const tasks = [
    {name: 'Task 1'},
    {name: 'Task 2'},
    {name: 'Task 3'},
    {name: 'Task 4'},
    {name: 'Task 5'},
    {name: 'Task 6'},
  ]

  return (
      <Stack sx={{width: 1, minWidth: '200px'}}>
        <List>
          {tasks.map((task, index) => (
            <ListedTask key={index} taskName={task.name} />
          ))}
        </List>
      </Stack>
  );
}