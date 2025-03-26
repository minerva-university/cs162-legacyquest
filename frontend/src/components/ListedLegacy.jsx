import { Avatar, ListItem, Stack, Typography, Box } from '@mui/material';

export default function ListedLegacy({legacyRanking, legacyName, legacyIconUrl, legacyScore, isHighlighted}) {
  return (
    <ListItem sx={{px: 2, py: 0.5, borderRadius: 2, overflow: 'hidden',
      background: 
      isHighlighted ? 'linear-gradient(0deg, transparent 0%, transparent 20%, #E6FED3 20%, #E6FED3 80%, transparent 80%, transparent 100%)' : 'transparent'
    }}>
      <Stack spacing={1} direction='row' sx={{alignItems: 'center', width: 1}}>
        <Typography sx={{width: '18px', textAlign: 'right'}}>{legacyRanking}</Typography>

        <Avatar src={legacyIconUrl} />
        <Typography sx={{fontWeight: 600}}>{legacyName}</Typography>

        <Box sx={{flexGrow: 1}}></Box>
        
        <Typography sx={{fontWeight: 400}}>{legacyScore} Points</Typography>
      </Stack>
    </ListItem>
  )
}