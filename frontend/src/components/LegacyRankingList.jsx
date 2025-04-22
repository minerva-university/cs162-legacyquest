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
  const [error, setError] = useState(null);
  
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
      setError(null);
      try {
        // Get user location if not already fetched
        let location = userLocation;
        if (!location) {
          location = await UserApi.getUserLocation(idToken);
          console.log("User location:", location);
          setUserLocation(location);
        }
        
        // Fetch user's legacy name if not already set
        if (!userLegacy) {
          const legacyName = await LegacyApi.getLegacyName(idToken);
          console.log("User legacy:", legacyName);
          setUserLegacy(legacyName);
        }
        
        console.log(`Fetching ${isGlobal ? 'global' : 'local'} rankings...`);
        
        // Fetch either global or local rankings based on current state
        let data;
        if (isGlobal) {
          data = await LegacyApi.getGlobalRanking();
          console.log("Received global rankings:", data);
        } else {
          data = await LegacyApi.getLocalRanking(location);
          console.log("Received local rankings:", data);
        }
        
        // Ensure we have an array (even if empty)
        const legaciesArray = Array.isArray(data) ? data : [];
        
        // If we got no legacies, provide fallback data for testing
        if (legaciesArray.length === 0 && isGlobal) {
          console.warn("No legacies returned from API, using fallback data");
          legaciesArray.push(
            { name: "Ocean", points: 1200 },
            { name: "Vista", points: 1050 },
            { name: "Terra", points: 900 },
            { name: "Nova", points: 750 },
            { name: "Aurora", points: 600 }
          );
        }
        
        setLegacies(legaciesArray);
      } catch (error) {
        console.error("Error fetching legacies:", error);
        setError("Failed to load rankings. Please try again later.");
        // Provide fallback data on error
        setLegacies([
          { name: "Ocean", points: 1200 },
          { name: "Vista", points: 1050 },
          { name: "Terra", points: 900 },
          { name: "Nova", points: 750 },
          { name: "Aurora", points: 600 }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isGlobal, idToken]);

  // Toggle between global and local view
  const toggleView = () => {
    setIsGlobal(!isGlobal);
  };

  // Determine if we have legacies to show
  const hasLegacies = legacies && legacies.length > 0;

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
        <Typography variant='h6' sx={{py: 1, fontWeight: 800}}>{isGlobal ? 'Global Ranking' : `${userLocation} Ranking`}</Typography>
        <Button 
          sx={{color: 'gray', fontWeight: 800, whiteSpace: 'nowrap', fontSize: 12}}
          onClick={toggleView}
          disabled={isLoading}
        >
          {isGlobal ? `View ${userLocation}` : "View Global"}
        </Button>
      </Stack>
      
      {/* Display the list of legacies, as a scrollable area */}
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        px: 1,
        // Height to show approximately 10 items
        maxHeight: '400px',
        display: 'flex',
        justifyContent: isLoading || !hasLegacies ? 'center' : 'flex-start',
        alignItems: isLoading || !hasLegacies ? 'center' : 'flex-start',
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
        ) : error ? (
          <Box sx={{ py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography color="error">{error}</Typography>
            <Button 
              onClick={() => setIsGlobal(prev => prev)} 
              variant="text" 
              color="primary"
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          </Box>
        ) : !hasLegacies ? (
          <Box sx={{ py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>No legacy rankings available</Typography>
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
      <Box sx={{
        p: 1, 
        textAlign: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        flexShrink: 0 // Prevent footer from shrinking
      }}>
        {!isLoading && !error && (
          <Typography variant="caption" color="text.secondary">
            Showing <span style={{fontWeight: 800}}>{isGlobal ? "global" : userLocation} </span> rankings
            {hasLegacies ? ` (${legacies.length} legacies)` : ''}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}