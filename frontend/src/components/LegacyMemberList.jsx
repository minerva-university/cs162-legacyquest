import { List, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedUser from './ListedUser';

export default function LegacyMemberList() {
  const theme = useTheme();
  const legacyMembers = [
    {name: 'Albert', xp: 999},
    {name: 'Bob', xp: 888},
    {name: 'Cindy', xp: 777},
    {name: 'Davis', xp: 666},
    {name: 'Edward', xp: 555},
    {name: 'Frank', xp: 444},
    {name: 'Grace', xp: 333},
    {name: 'Howard', xp: 222},
  ]

  return (
      <Stack sx={{width: 1, borderRadius: 2, boxShadow: `0 0 6px ${theme.palette.shadowGreen}`}}>
        <List>
          <Typography variant='h6' sx={{px: 3, py: 1, fontWeight: 800}}>Legacy Members</Typography>
          {legacyMembers.map((member, index) => (
            <ListedUser key={index} userName={member.name} userXP={member.xp} />
          ))}
        </List>
      </Stack>
  );
}