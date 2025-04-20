import { Stack, Typography, Box } from '@mui/material';
import crownIcon from '../assets/crown.svg';

// Component that displays a student's info (name, cohort, legacy)
export default function StudentInfo({legacyName, cohortName}) {
  // Extract only the first word from the legacy name
  const displayLegacy = legacyName ? legacyName.split(' ')[0] : 'Unknown';
  
  return (
    <Stack direction='column' spacing={1} sx={{width: 1, alignContent: 'center'}}>
      <Stack direction='row' sx={{justifyContent: 'center'}}>
        <Typography sx={{fontWeight: 800, mr: 1}}>Legacy:</Typography>
        <Typography sx={{fontWeight: 700, color: 'GrayText'}}>{displayLegacy}</Typography>
      </Stack>
      <Stack direction='row' sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{display: 'flex', alignItems: 'center', mr: 1}}>
          <img 
            src={crownIcon} 
            alt="Crown" 
            style={{
              width: '27px',
              height: '20px',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Typography sx={{fontWeight: 800, mr: 1}}>Cohort:</Typography>
        <Typography sx={{fontWeight: 700, color: 'GrayText'}}>{cohortName}</Typography>
      </Stack>
    </Stack>
  )
}