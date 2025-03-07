import { List, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedUser from './ListedUser';

export default function LegacyMemberList() {
  const theme = useTheme();
  const legacyMembers = [
    {name: '111', xp: 999},
    {name: '222', xp: 888},
    {name: '333', xp: 777},
    {name: '444', xp: 666},
    {name: '555', xp: 555},
    {name: '666', xp: 444},
    {name: '777', xp: 333},
    {name: '888', xp: 222},
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