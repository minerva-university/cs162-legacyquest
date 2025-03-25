import { Stack, List, Typography, Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedLegacy from './ListedLegacy';

export default function LegacyRankingList({highlightedLegacy}) {
  const theme = useTheme();

  const getLegacyRanking = () => {
    // Retrieve legacy ranking as a list, include their name and points
    const legacyRanking = [
      {name: 'Octagon', points: 999},
      {name: 'Tower', points: 888},
      {name: 'Bridge', points: 777},
      {name: 'Hunter', points: 666},
      {name: 'Chronicle', points: 555},
      {name: 'Pyramid', points: 444},
      {name: 'Vista', points: 333},
      {name: 'Cable', points: 222},
      {name: 'Pulse', points: 111},
      {name: 'Horizon', points: 100},
      {name: 'Pioneer', points: 90},
      {name: 'Eclipse', points: 80},
      {name: 'Quest', points: 70},
      {name: 'Solar', points: 60},
      {name: 'Nova', points: 50},
      {name: 'Galaxy', points: 40},
      {name: 'Orbit', points: 30},
    ];

    return legacyRanking;
  }
  
  const getLegacyIcon = (legacyName) => {
    const defaultIcon = 'https://mui.com/static/images/avatar/1.jpg';

    return defaultIcon;
  }

  const allLegacies = getLegacyRanking();




  return (
      <Stack sx={{
        width: 0.8, 
        minWidth: '300px', 
        borderRadius: 2, 
        boxShadow: `0 0 6px ${theme.palette.shadowGreen}`,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant='h6' sx={{px: 4, py: 2, fontWeight: 800, flexShrink: 0}}>Legacy Ranking</Typography>
        
        <Box sx={{
          overflowY: 'auto',
          flexGrow: 1,
          px: 4,
          // Height to show approximately 10 items (adjust based on item height)
          maxHeight: '480px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.05)',
          }
        }}>
          <List sx={{pt: 0, pb: 2}}>
            {allLegacies.map((legacy, index) => (
              <ListedLegacy
                key={index}
                legacyRanking={index+1}
                legacyName={legacy.name}
                legacyIconUrl={getLegacyIcon(legacy.name)}
                legacyScore={legacy.points}
                isHighlighted={highlightedLegacy === legacy.name}
              />
            ))}
          </List>
        </Box>
      </Stack>
  );
}