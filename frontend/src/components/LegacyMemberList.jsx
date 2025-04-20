import { Button, List, Stack, Typography, Box, Collapse, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListedUser from './ListedUser';
import { useState, useEffect } from 'react';
import LegacyApi from "@services/LegacyApi.jsx";
import UserApi from "@services/UserApi.jsx";
import { useAuth } from '@services/AuthContext.jsx';

// Extract base legacy name (first word)
const getBaseLegacyName = (legacyName) => {
  if (!legacyName) return '';
  return legacyName.split(' ')[0];
};

// A component to display a list of legacy members
export default function LegacyMemberList({legacyName}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allMembers, setAllMembers] = useState([]);
  const [cohortMembers, setCohortMembers] = useState([]);
  const [otherMembers, setOtherMembers] = useState([]);
  const [userCohort, setUserCohort] = useState('');
  const [baseLegacyName, setBaseLegacyName] = useState('');
  const theme = useTheme();
  const { idToken } = useAuth();  
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch data in parallel
        const [userCohort, userLegacyName] = await Promise.all([
          UserApi.getCohort(idToken),
          LegacyApi.getLegacyName(idToken)
        ]);
        
        // Extract base legacy name
        const baseName = getBaseLegacyName(userLegacyName);
        setBaseLegacyName(baseName);
        setUserCohort(userCohort);
        
        console.log("Fetching members for base legacy name:", baseName);
        
        // Now fetch members with this base legacy name
        const fetchedMembers = await LegacyApi.getLegacyMembers(idToken);
        console.log("Fetched members:", fetchedMembers);
        
        if (Array.isArray(fetchedMembers)) {
          setAllMembers(fetchedMembers);
          
          // Filter by cohort for the "View Cohort" mode
          setCohortMembers(fetchedMembers.filter(member => 
            member.cohort === userCohort
          ));
          
          // All other members (different cohorts)
          setOtherMembers(fetchedMembers.filter(member => 
            member.cohort !== userCohort
          ));
        } else {
          console.error("Invalid members data format:", fetchedMembers);
          setAllMembers([]);
          setCohortMembers([]);
          setOtherMembers([]);
        }
      } catch (error) {
        console.error("Error loading legacy members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [idToken]);
  
  const toggleViewAll = () => {
    setIsViewAll(!isViewAll);
  };

  return (
    <Stack sx={{
      width: 1, 
      borderRadius: 2, 
      boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}`,
      maxHeight: '500px',
      maxWidth: '360px',
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
          {isViewAll ? "View Cohort" : "View All"}
        </Button>
      </Stack>
      
      {/* List of members, as a scrolling area */}
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        maxHeight: '400px',
        minHeight: '60px',
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
            {!isViewAll && (
              // Show only cohort members when "View Cohort" is active
              cohortMembers.map((member, index) => (
                <ListedUser 
                  key={`cohort-${index}`} 
                  userName={member.name} 
                  cohort={member.cohort} 
                  avatarUrl={member.avatarUrl} 
                />
              ))
            )}
            
            {isViewAll && (
              // Show ALL members when "View All" is active
              allMembers.map((member, index) => (
                <ListedUser 
                  key={`all-${index}`} 
                  userName={member.name} 
                  cohort={member.cohort} 
                  avatarUrl={member.avatarUrl} 
                  location={member.location}
                />
              ))
            )}
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
            {!isViewAll && cohortMembers.length > 0 && (
              <Typography variant="caption" color="text.secondary">
                Showing <span style={{fontWeight: 800}}>{userCohort} {baseLegacyName}</span> members
              </Typography>
            )}
            
            {isViewAll && (
              <Typography variant="caption" color="text.secondary">
                Showing all <span style={{fontWeight: 800}}>{baseLegacyName}</span> members
              </Typography>
            )}
            
            {!isViewAll && cohortMembers.length === 0 && (
              <Typography variant="caption" color="text.secondary">
                No <span style={{fontWeight: 800}}>{userCohort} {baseLegacyName}</span> members found
              </Typography>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
}