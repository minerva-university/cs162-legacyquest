import { Button, List, Stack, Typography, Box, Collapse, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedUser from './ListedUser';
import { useState, useEffect } from 'react';
import LegacyApi from "@services/LegacyApi.jsx";
import UserApi from "@services/UserApi.jsx";
import { useAuth } from '@services/AuthContext.jsx';

// A component to display a list of legacy members
// This component is no longer used in the new design, but is kept for reference
export default function LegacyMemberList({legacyName}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [localMembers, setLocalMembers] = useState([]);
  const [nonLocalMembers, setNonLocalMembers] = useState([]);
  const theme = useTheme();
  const { idToken } = useAuth();  
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch data in parallel
        const [fetchedMembers, userLocation] = await Promise.all([
          LegacyApi.getLegacyMembers(idToken),
          UserApi.getUserLocation(idToken)
        ]);
        
        setUserLocation(userLocation);
        setMembers(fetchedMembers);
        
        // Sort the members first by location and then by cohort
        fetchedMembers.sort((a, b) => {
          if (a.location === b.location) {
            return a.cohort.localeCompare(b.cohort);
          }
          return a.location.localeCompare(b.location);
        });

        // Filter members based on location
        setLocalMembers(fetchedMembers.filter(member => member.location === userLocation));
        setNonLocalMembers(fetchedMembers.filter(member => member.location !== userLocation));
      } catch (error) {
        console.error("Error loading legacy members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [legacyName]); // Re-fetch if legacyName changes
  
  const toggleViewAll = () => {
    setIsViewAll(!isViewAll);
  };

  return (
    <Stack sx={{
      width: 1, 
      borderRadius: 2, 
      boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}`,
      maxHeight: '500px',
    }}>
      {/* List header */}
      <Stack direction='row' sx={{
        px: 2, 
        py: 0.5, 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography variant='h6' sx={{py: 1, fontWeight: 800}}>Legacy Members</Typography>          
        <Button 
          sx={{color: 'gray', fontWeight: 800, fontSize: 12, width: '110px'}}
          onClick={toggleViewAll}
          disabled={isLoading}
        >
          {isViewAll ? "View Local" : "View All"}
        </Button>
      </Stack>
      
      {/* List of members, as a scrolling area */}
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        maxHeight: '400px',
        minHeight: '100px',
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
          <CircularProgress color="primary" size={40} thickness={4} />
        ) : (
          <List sx={{ width: '100%', pt: 0 }}>
            {/* Local members are always visible */}
            {localMembers.map((member, index) => (
              <ListedUser 
                key={`local-${index}`} 
                userName={member.name} 
                cohort={member.cohort} 
                avatarUrl={member.avatarUrl} 
                location={member.location}
              />
            ))}
            
            {/* Non-local members collapse based on isViewAll state */}
            <Collapse in={isViewAll} timeout="auto" unmountOnExit>
              <Box>
                {nonLocalMembers.map((member, index) => (
                  <ListedUser 
                    key={`nonlocal-${index}`} 
                    userName={member.name} 
                    cohort={member.cohort} 
                    avatarUrl={member.avatarUrl} 
                    location={member.location}
                  />
                ))}
              </Box>
            </Collapse>
          </List>
        )}
      </Box>
      
      {/* A footer to display whether this is a list of all members or local members */}
      <Box sx={{
        p: 1, 
        textAlign: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        flexShrink: 0 // Prevent footer from shrinking
      }}>
        {!isLoading && (
          <>
            {!isViewAll && localMembers.length > 0 && (
              <Typography variant="caption" color="text.secondary">
                Showing <span style={{fontWeight: 800}}>{legacyName}</span> members in <span style={{fontWeight: 800}}>{userLocation}</span> 
              </Typography>
            )}
            
            {isViewAll && (
              <Typography variant="caption" color="text.secondary">
                Showing all <span style={{fontWeight: 800}}>{legacyName}</span> members
              </Typography>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
}