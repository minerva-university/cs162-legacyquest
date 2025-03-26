import { Stack, List, Typography, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedLegacy from './ListedLegacy';
import { useState, useEffect } from 'react';

export default function LegacyRankingList({highlightedLegacy}) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [legacies, setLegacies] = useState([]);
  
  // TODO: check whether to leave icons or not
  const getLegacyIcon = (legacyName) => {
    const defaultIcon = 'https://mui.com/static/images/avatar/1.jpg';

    return defaultIcon;
  }

  // TODO: link to DB to fetch legacy ranking data from the server
  const fetchLegacyRanking = async () => {
    // Fake delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy data
    const legacyList = [
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

    return legacyList;
  }

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLegacyRanking();
        setLegacies(data);
      } catch (error) {
        console.error("Error fetching legacies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [highlightedLegacy]); // Re-fetch if highlightedLegacy changes

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
        // Height to show approximately 10 items
        maxHeight: '480px',
        display: 'flex',
        justifyContent: isLoading ? 'center' : 'flex-start',
        alignItems: isLoading ? 'center' : 'flex-start',
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
        {isLoading ? (
          <Box sx={{ py: 10 }}>
            <CircularProgress color="primary" size={40} thickness={4} />
          </Box>
        ) : (
          <List sx={{ width: '100%', pt: 0, pb: 2 }}>
            {legacies.map((legacy, index) => (
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
        )}
      </Box>
    </Stack>
  );
}