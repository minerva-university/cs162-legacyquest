import { List, Stack, Typography } from '@mui/material';
import ListedTask from './ListedTask';

export default function TaskList() {
  const tasks = [
    {name: 'Task 1', description: 'A very long description. A very long description. A very long description. A very long description.', status: 'Not Submitted'},
    {name: 'Task 2', description: 'Description 2..........', status: 'Not Submitted'},
    {name: 'Task 3', description: 'Description 3..........', status: 'Waiting Approval'},
    {name: 'Task 4', description: 'Description 4..........', status: 'Approved'},
    {name: 'Task 5', description: 'Description 5..........', status: 'Rejected'},
  ]

  return (
      <Stack sx={{width: 1, minWidth: '200px', maxWidth: '500px'}}>
        <List>
          {tasks.map((task, index) => (
            <ListedTask key={index} taskName={task.name} taskDescription={task.description} taskStatus={task.status} />
          ))}
        </List>
      </Stack>
  );
}