import { Stack, List, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedLegacy from './ListedLegacy';
import { useState, useEffect } from 'react';
import LegacyApi from "@services/LegacyApi.jsx";
import UserApi from "@services/UserApi.jsx";
import { useAuth } from '@services/AuthContext.jsx';

// Helper function to check if legacy names match or are similar
const isLegacyMatch = (userLegacyName, displayedLegacyName) => {
  if (!userLegacyName || !displayedLegacyName) return false;
  
  // Exact match
  if (userLegacyName.toLowerCase() === displayedLegacyName.toLowerCase()) return true;
  
  // Check if one contains the other (for cases like "Ocean SF" and "Ocean")
  if (userLegacyName.toLowerCase().includes(displayedLegacyName.toLowerCase())) return true;
  if (displayedLegacyName.toLowerCase().includes(userLegacyName.toLowerCase())) return true;
  
  // Extract the first word for comparison (e.g., "Ocean SF" -> "Ocean")
  const userFirstWord = userLegacyName.split(' ')[0].toLowerCase();
  const displayedFirstWord = displayedLegacyName.split(' ')[0].toLowerCase();
  
  return userFirstWord === displayedFirstWord;
};

export default function LegacyRankingList() {
  const theme = useTheme();
  const { idToken, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [legacies, setLegacies] = useState([]);
  const [isGlobal, setIsGlobal] = useState(true);
  const [userLocation, setUserLocation] = useState('');
  const [userLegacy, setUserLegacy] = useState('');
  
  // Function to get legacy icon URL based on legacy name
  // This is no longer used in the new design, but is kept for reference
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
          location = await UserApi.getUserLocation(idToken);
          setUserLocation(location);
        }
        
        // Fetch user's legacy name if not already set
        if (!userLegacy) {
          const legacyName = await LegacyApi.getLegacyName(idToken);
          setUserLegacy(legacyName);
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
  }, [isGlobal, idToken]);

  // Toggle between global and local view
  const toggleView = () => {
    // setIsGlobal(!isGlobal);
  };

  return (
    <Stack sx={{
      width: 0.9, 
      minWidth: '450px', 
      borderRadius: 2, 
      boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* List title*/}
      <Stack direction='row' sx={{
        px: 4, 
        py: 0.5, 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography variant='h6' sx={{py: 1, fontWeight: 800}}>{isGlobal ? 'Global Legacy Ranking' : 'Local Legacy Ranking'}</Typography>
        {/* <Button 
          sx={{color: 'gray', fontWeight: 800, whiteSpace: 'nowrap', fontSize: 12}}
          onClick={toggleView}
          disabled={isLoading}
        >
          {isGlobal ? `View ${userLocation}` : "View Global"}
        </Button> */}
      </Stack>
      
      {/* Display the list of legacies, as a scrollable area */}
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        px: 1,
        // Height to show approximately 10 items
        maxHeight: '400px',
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
          <List sx={{ width: '100%', pt: 0, pb: 1 }}>
            {legacies.map((legacy, index) => (
              <ListedLegacy
                key={index}
                legacyRanking={index+1}
                legacyName={legacy.name}
                legacyIconUrl={getLegacyIcon(legacy.name)}
                legacyScore={legacy.points}
                isHighlighted={isLegacyMatch(userLegacy, legacy.name)}
              />
            ))}
          </List>
        )}
      </Box>
      
      {/* Footer showing whether this is a global or local ranking */}
      {/* <Box sx={{
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
      </Box> */}
    </Stack>
  );
}