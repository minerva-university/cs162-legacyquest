import { Avatar, Stack, Container, Typography, Paper, Button, ButtonGroup } from '@mui/material';

export default function AdminProfile() {
  return (
    <Container sx={{m:0, px: 1, bgcolor: '#fafafa'}}>
      <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'stretch', gap: 2}}>
        <Avatar
          alt='User Avatar'
          src='https://mui.com/static/images/avatar/1.jpg'
          sx={{ width: 0.6, height: 0.6, mt: 5, boxShadow: 4, border: 5, borderColor: 'white'}}
          />
        <Typography variant='h6' sx={{fontWeight: 800}}>Branden B.</Typography>
        <Typography variant='h6' sx={{fontWeight: 600}}>San Francisco</Typography>

        {/* We need an "add task" form here */}

      </Stack>
    </Container>
  );
}