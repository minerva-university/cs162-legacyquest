import { List, Stack, Typography } from '@mui/material';
import ListedTask from './ListedTask';

export default function TaskList() {
  const tasks = [
    {name: 'Task 1', currentProgress: 1, targetProgress: 7},
    {name: 'Task 2', currentProgress: 3, targetProgress: 5},
    {name: 'Task 3', currentProgress: 0, targetProgress: 10},
    {name: 'Task 4', currentProgress: 2, targetProgress: 4},
    {name: 'Task 5', currentProgress: 4, targetProgress: 6},
    {name: 'Task 6', currentProgress: 1, targetProgress: 3},
  ]

  return (
      <Stack sx={{width: 1, minWidth: '200px'}}>
        <List>
          {tasks.map((task, index) => (
            <ListedTask key={index} taskName={task.name} currentProgress={task.currentProgress} targetProgress={task.targetProgress} />
          ))}
        </List>
      </Stack>
  );
}