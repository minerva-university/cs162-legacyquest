import { Avatar, ListItem, Stack, Typography, Box } from '@mui/material';
import treasureBox from '../assets/treasure-box.svg';
import silverTreasureBox from '../assets/silver-treasure-box.svg';
import bronzeTreasureBox from '../assets/bronze-treasure-box.svg';

// The legacy that is displayed in the legacy ranking list
export default function ListedLegacy({legacyRanking, legacyName, legacyScore, isHighlighted}) {
  return (
    <ListItem sx={{px: 2, py: 0.5, borderRadius: 2, overflow: 'hidden',
      background: 
      isHighlighted ? 'linear-gradient(0deg, transparent 0%, transparent 20%, #E6FED3 20%, #E6FED3 80%, transparent 80%, transparent 100%)' : 'transparent'
    }}>
      <Stack spacing={1} direction='row' sx={{alignItems: 'center', width: 1, minHeight: '40px'}}>
        <Typography sx={{width: '18px', textAlign: 'right'}}>{legacyRanking}</Typography>
        <Typography sx={{fontWeight: 600, pl: 1}}>{legacyName}</Typography>

        <Box sx={{flexGrow: 1}}></Box>
        
        {/* Display gold, silver, or bronze treasure box based on ranking */}
        {legacyRanking === 1 && (
          <Box sx={{display: 'flex', alignItems: 'center', mx: 1}}>
            <img 
              src={treasureBox} 
              alt="Treasure Box" 
              style={{
                width: '32px',
                height: '28px',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}
        
        {legacyRanking === 2 && (
          <Box sx={{display: 'flex', alignItems: 'center', mx: 1}}>
            <img 
              src={silverTreasureBox} 
              alt="Silver Treasure Box" 
              style={{
                width: '32px',
                height: '28px',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}
        
        {legacyRanking === 3 && (
          <Box sx={{display: 'flex', alignItems: 'center', mx: 1}}>
            <img 
              src={bronzeTreasureBox} 
              alt="Bronze Treasure Box" 
              style={{
                width: '32px',
                height: '28px',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}
        
        <Typography sx={{fontWeight: 400}}>{legacyScore} Points</Typography>
      </Stack>
    </ListItem>
  )
}