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
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  
  const [cohortMembers, setCohortMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [allMembersFetched, setAllMembersFetched] = useState(false);
  
  const [userCohort, setUserCohort] = useState('');
  const [baseLegacyName, setBaseLegacyName] = useState('');
  const theme = useTheme();
  const { idToken } = useAuth();  
  
  useEffect(() => {
    const fetchData = async () => {
      if (!idToken) return;
      
      setIsLoading(true);
      setAllMembersFetched(false);
      setAllMembers([]);
      
      try {
        const userData = await UserApi.getProfile(idToken); 
        const userLegacyId = userData.legacy?.legacy_id;
        const userCohortId = userData.cohort?.cohort_id;
        const cohortName = userData.cohort?.name || 'Unknown Cohort';
        const fullLegacyName = userData.legacy?.name || 'Unknown Legacy';
        
        setUserCohort(cohortName);
        setBaseLegacyName(getBaseLegacyName(fullLegacyName));
        
        if (userLegacyId != null && userCohortId != null) {
            console.log(`Fetching initial members for legacy ${userLegacyId} and cohort ${userCohortId}`);
            const initialMembers = await LegacyApi.getSpecificCohortMembers(idToken, userLegacyId, userCohortId);
            setCohortMembers(initialMembers);
        } else {
            console.warn("User legacy or cohort ID missing, cannot fetch initial members.");
            setCohortMembers([]);
        }
        
      } catch (error) {
        console.error("Error loading initial legacy members data:", error);
        setCohortMembers([]);
        setUserCohort('Error');
        setBaseLegacyName('Error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [idToken]);
  
  const handleToggleView = async () => {
    const nextIsViewAll = !isViewAll;
    setIsViewAll(nextIsViewAll);

    if (nextIsViewAll && !allMembersFetched) {
      if (!baseLegacyName || baseLegacyName === 'Error' || !idToken) {
        console.error("Cannot fetch all members: Missing base legacy name or token.");
        return;
      }
      
      setIsLoadingAll(true);
      try {
        console.log("Fetching all members for base legacy name:", baseLegacyName);
        const fetchedAllMembers = await LegacyApi.getLegacyMembers(idToken, baseLegacyName);
        setAllMembers(fetchedAllMembers);
        setAllMembersFetched(true);
      } catch (error) {
        console.error("Error fetching all legacy members:", error);
        setAllMembers([]);
      } finally {
        setIsLoadingAll(false);
      }
    }
  };

  return (
    <Stack sx={{
      width: '360px',
      borderRadius: 2, 
      boxShadow: `0 0 10px 1px ${theme.palette.shadowBrown}`,
      height: '450px', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Stack direction='row' sx={{
        px: 2, 
        py: 0.5, 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography variant='h6' sx={{py: 1, fontWeight: 800}}>Legacy Members</Typography>          
        <Button 
          sx={{
            color: 'gray', 
            fontWeight: 800, 
            whiteSpace: 'nowrap',
            fontSize: 12,
            minWidth: '85px',
            padding: '6px 8px'
          }}
          disableRipple
          onClick={handleToggleView}
          disabled={isLoading || isLoadingAll}
        >
          {isViewAll ? "View Cohort" : "View All"}
        </Button>
      </Stack>
      
      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        height: '350px',
        display: 'flex',
        width: '100%',
        position: 'relative',
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
          <List 
            sx={{ 
              width: '100%', 
              pt: 0,
              pb: 0,
              position: 'static',
              overflow: 'visible'
            }}
          >
            {!isViewAll ? (
              cohortMembers.length > 0 ? (
                cohortMembers.map((member, index) => (
                  <ListedUser 
                    key={`cohort-${member.name}-${index}`}
                    userName={member.name} 
                    cohort={member.cohort} 
                    avatarUrl={member.avatarUrl} 
                  />
                ))
              ) : (
                <Box sx={{ py: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No members found in your cohort
                  </Typography>
                </Box>
              )
            ) : (
              isLoadingAll ? (
                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                     <CircularProgress color="primary" size={40} thickness={4} />
                 </Box>
              ) : allMembers.length > 0 ? (
                allMembers.map((member, index) => (
                  <ListedUser 
                    key={`all-${member.name}-${index}`}
                    userName={member.name} 
                    cohort={member.cohort} 
                    avatarUrl={member.avatarUrl} 
                  />
                ))
              ) : (
                <Box sx={{ py: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No members found for {baseLegacyName}
                  </Typography>
                </Box>
              )
            )}
          </List>
        )}
      </Box>
      
      <Box sx={{
        p: 1, 
        height: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {!isLoading && (
          <>
            {!isViewAll && (
              <Typography variant="caption" color="text.secondary">
                Showing <span style={{fontWeight: 800}}>{userCohort}</span> members
              </Typography>
            )}
            {isViewAll && allMembersFetched && (
              <Typography variant="caption" color="text.secondary">
                Showing all <span style={{fontWeight: 800}}>{baseLegacyName}</span> members
              </Typography>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
}