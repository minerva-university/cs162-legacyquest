import { Button, List, Stack, Typography, Box, Collapse, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedUser from './ListedUser';
import { useState, useEffect } from 'react';

export default function LegacyMemberList({legacyName}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [localMembers, setLocalMembers] = useState([]);
  const [nonLocalMembers, setNonLocalMembers] = useState([]);
  const theme = useTheme();

  // TODO: Implement a function connected to DB to get user's location
  const getUserLocation = () => {
    return 'San Francisco';
  }

  // TODO: store user's location somewhere in the app state, like in a cookie or session storage
  const userLocation = getUserLocation();

  // TODO: connect with DB in this format
  // Simulate retrieving data from the server
  const fetchLegacyMembers = async () => {
    // A fake delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy data
    return [
      {name: 'Albert', cohort: 'M26', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Bob', cohort: 'M27', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Cindy', cohort: 'M28', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Davis', cohort: 'M24', location: 'Berlin', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Edward', cohort: 'M25', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Frank', cohort: 'M26', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Grace', cohort: 'M27', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Howard', cohort: 'M28', location: 'Taipei', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Ivy', cohort: 'M24', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Jack', cohort: 'M25', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Kathy', cohort: 'M26', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Leo', cohort: 'M27', location: 'Berlin', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Mia', cohort: 'M28', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Nancy', cohort: 'M24', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Oliver', cohort: 'M25', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Peter', cohort: 'M26', location: 'Taipei', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Quincy', cohort: 'M27', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Rachel', cohort: 'M28', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Sam', cohort: 'M24', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
    ];
  }
  
  
  // Fetch data and separate local vs non-local members
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedMembers = await fetchLegacyMembers();
        setMembers(fetchedMembers);
        
        // Separate local and non-local members
        setLocalMembers(fetchedMembers.filter(member => member.location === userLocation));
        setNonLocalMembers(fetchedMembers.filter(member => member.location !== userLocation));
      } catch (error) {
        console.error("Error fetching members:", error);
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
      boxShadow: `0 0 6px ${theme.palette.shadowGreen}`,
      maxHeight: '500px', // Set maximum height for the entire component
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
          sx={{color: 'gray', fontWeight: 800, width: '110px'}}
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
      
      {/* Displays the location of the members */}
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
                Showing {legacyName} members in {userLocation}
              </Typography>
            )}
            
            {isViewAll && (
              <Typography variant="caption" color="text.secondary">
                Showing all {legacyName} members
              </Typography>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
}