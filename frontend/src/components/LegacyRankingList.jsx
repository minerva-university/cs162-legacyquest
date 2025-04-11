import { Stack, List, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedLegacy from './ListedLegacy';
import { useState, useEffect } from 'react';
import LegacyApi from '../../backend/LegacyApi.jsx';
import UserApi from '../../backend/UserApi.jsx';

export default function LegacyRankingList({highlightedLegacy}) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [legacies, setLegacies] = useState([]);
  const [isGlobal, setIsGlobal] = useState(true); // Track if viewing global or local rankings
  const [userLocation, setUserLocation] = useState('');
  
  const getLegacyIcon = (legacyName) => {
    const defaultIcon = 'https://mui.com/static/images/avatar/1.jpg';

    return defaultIcon;
  }

  // Fetch data when component mounts or when view changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get user location if not already fetched
        let location = userLocation;
        if (!location) {
          location = await UserApi.getUserLocation();
          setUserLocation(location);
        }
        
        // Fetch either global or local rankings based on current state
        const data = isGlobal 
          ? await LegacyApi.getGlobalRanking() 
          : await LegacyApi.getLocalRanking(location);
        
        setLegacies(data);
      } catch (error) {
        console.error("Error fetching legacies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isGlobal, highlightedLegacy]); // Re-fetch if view changes or highlightedLegacy changes

  // Toggle between global and local view
  const toggleView = () => {
    setIsGlobal(!isGlobal);
  };

  return (
    <Stack sx={{
      width: 0.8, 
      minWidth: '400px', 
      borderRadius: 2, 
      boxShadow: `0 0 6px ${theme.palette.shadowGreen}`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with toggle button */}
      <Stack direction='row' sx={{
        px: 4, 
        py: 0.5, 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography variant='h6' sx={{py: 1, fontWeight: 800}}>Legacy Ranking</Typography>
        <Button 
          sx={{color: 'gray', fontWeight: 800, whiteSpace: 'nowrap', fontSize: 12}}
          onClick={toggleView}
          disabled={isLoading}
        >
          {isGlobal ? `View ${userLocation}` : "View Global"}
        </Button>
      </Stack>
      
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        px: 1,
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
          <Box sx={{ py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress color="primary" size={40} thickness={4} />
            <Typography variant="body1" sx={{mt: 2}}>Loading ranking...</Typography>
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
      
      {/* Footer showing current view */}
      <Box sx={{
        p: 1, 
        textAlign: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        flexShrink: 0 // Prevent footer from shrinking
      }}>
        {!isLoading && (
          <Typography variant="caption" color="text.secondary">
            Showing <span style={{fontWeight: 800}}>{isGlobal ? "global" : userLocation} </span> rankings
          </Typography>
        )}
      </Box>
    </Stack>
  );
}