import { Button, List, Stack, Typography, Box, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedUser from './ListedUser';
import { useState } from 'react';

export default function LegacyMemberList({legacyName}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const theme = useTheme();

  const getLegacyMembers = () => {
    // Retrieve legacy members as a list, include their name, cohort, location, and avatar url
    const legacyMembers = [
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

    return legacyMembers;
  }
  
  const getUserLocation = () => {
    // Get the user's city location
    return 'San Francisco';
  }
  
  // Get local and non-local members separately
  const getLocalMembers = () => {
    const allMembers = getLegacyMembers();
    const userLocation = getUserLocation();
    return allMembers.filter(member => member.location === userLocation);
  };

  const getNonLocalMembers = () => {
    const allMembers = getLegacyMembers();
    const userLocation = getUserLocation();
    return allMembers.filter(member => member.location !== userLocation);
  };

  // Toggle View All function
  const toggleViewAll = () => {
    setIsViewAll(!isViewAll);
  };

  const localMembers = getLocalMembers();
  const nonLocalMembers = getNonLocalMembers();

  return (
      <Stack sx={{
        width: 1, 
        borderRadius: 2, 
        boxShadow: `0 0 6px ${theme.palette.shadowGreen}`,
        maxHeight: '500px', // Set maximum height for the entire component
      }}>
        {/* List heaeder */}
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
          >
            {isViewAll ? "View Local" : "View All"}
          </Button>
        </Stack>

        <List sx={{
          overflowY: 'auto', // Enable vertical scrolling
          flexGrow: 1, // Allow list to grow and take available space
          maxHeight: '400px', // Set a maximum height for the list
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
        
        {/* Displays the location of the members */}
        <Box sx={{
          p: 1, 
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          flexShrink: 0 // Prevent footer from shrinking
        }}>
          {!isViewAll && localMembers.length > 0 && (
            <Typography variant="caption" color="text.secondary">
              Showing {legacyName} members in {getUserLocation()}
            </Typography>
          )}
          
          {isViewAll && (
            <Typography variant="caption" color="text.secondary">
              Showing all {legacyName} members
            </Typography>
          )}
        </Box>
      </Stack>
  );
}