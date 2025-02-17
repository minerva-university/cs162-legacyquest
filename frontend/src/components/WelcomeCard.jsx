import { Stack, Typography } from '@mui/material';
import MinieWelcome from '../assets/MinieWelcome.svg';

export default function WelcomeCard({taskCompletedPercentage}) {
  return (
    <Stack spacing={4} direction='row' sx={{py: 6, alignItems: 'center'}}>
      <img src={MinieWelcome} alt='Welcome' style={{height: '120px', width: 'auto', objectFit: 'contain', transform: 'rotate(-20deg)'}}/>
      <Stack spacing={3}>
        <Typography variant='h3'>Welcome back <span style={{fontWeight: 750}}>Minie!</span></Typography>
        <Stack direction='row'>
          <Typography sx={{fontWeight: 600}}>
            You have Completed <span style={{fontWeight: 700, color: '#CC6A02'}}>{taskCompletedPercentage}% of your daily goal!</span>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}