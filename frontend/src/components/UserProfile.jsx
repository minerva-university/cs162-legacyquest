import { Avatar, Stack, Container, Typography, Paper, Button, ButtonGroup } from '@mui/material';
import LegacyMemberList from './LegacyMemberList';
import { Assignment, Logout } from '@mui/icons-material';

export default function UserProfile() {
  const gridProps = {
    size:{
      xs: 3,
      lg: 3,
    }
  };

  return (
    <Container sx={{m:0, px: 1, bgcolor: '#fafafa'}}>
      <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'stretch', gap: 2}}>
        <Avatar
          alt='User Avatar'
          src='https://mui.com/static/images/avatar/1.jpg'
          sx={{ width: 0.6, height: 0.6, mt: 5, boxShadow: 4, border: 5, borderColor: 'white'}}
          />
        <Typography variant='h6' sx={{fontWeight: 800}}>User Name</Typography>
        <Stack direction='row' spacing={1} sx={{width: 1, justifyContent: 'space-between'}}>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Assignment sx={{fontSize: '2rem', color: 'yellowgreen'}}/>
            <Typography sx={{fontWeight: 800, color: 'graytext'}}>240</Typography>
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Assignment sx={{fontSize: '2rem', color: 'lightsalmon'}}/>
            <Typography sx={{fontWeight: 800, color: 'graytext'}}>240</Typography>
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Assignment sx={{fontSize: '2rem', color: 'orange'}}/>
            <Typography sx={{fontWeight: 800, color: 'graytext'}}>240</Typography>
          </Stack>
          <Stack direction='row' sx={{alignItems: 'center'}}>
          <Assignment sx={{fontSize: '2rem', color: 'orangered'}}/>
          <Typography sx={{fontWeight: 800, color: 'graytext'}}>231</Typography>
          </Stack>
        </Stack>
        <Paper elevation={1} sx={{width: 1, borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <ButtonGroup fullWidth variant='text' sx={{width: 1, '& .MuiButton-root': {border: 'none', height: '50px'}}}>
            <Button><Logout /></Button>
            <Button><Logout /></Button>
            <Button><Logout /></Button>
            <Button><Logout /></Button>
            <Button><Logout /></Button>
          </ButtonGroup>
        </Paper>
        <LegacyMemberList />
      </Stack>
    </Container>
  );
}