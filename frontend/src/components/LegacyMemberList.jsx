import { List, ListItemText, Paper, Typography } from '@mui/material';
import UserListDisplay from './UserListDisplay';

export default function LegacyMemberList() {
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
      <Paper sx={{width: 1, borderRadius: 2}}>
        <List>
          <Typography variant='h6' sx={{px: 3, py: 1, fontWeight: 800}}>Legacy Members</Typography>
          {legacyMembers.map((member, index) => (
            <UserListDisplay key={index} userName={member.name} userXP={member.xp} />
          ))}
        </List>
      </Paper>
  );
}